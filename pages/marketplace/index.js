import { useOwnedCourses, useWalletInfo } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button, Modal } from "@components/ui/common";
import BaseLayout from "@components/ui/common/layout/base";
import { CourseCard, CourseList } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";
import { useState } from "react";
import { MarketHeader } from "@components/ui/marketplace";
import { useRouter } from "next/router";

export default function Marketplace({ courses }) {
  const router = useRouter();
  const { hasConnectedWallet, account, network, isConnecting } =
    useWalletInfo();
  const { requireInstall, contract, web3 } = useWeb3();

  const [busyCourseId, setBusyCourseId] = useState(null);
  const [isNewPurchase, setIsNewPurchase] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const { ownedCourses } = useOwnedCourses(courses, account.data);

  const cleanUpModal = () => {
    setSelectedCourse(null);
    setIsNewPurchase(true);
  };

  const _purchaseCourse = async (hexCourseId, proof, value) => {
    try {
      const result = await contract.methods
        .purchaseCourse(hexCourseId, proof)
        .send({ from: account.data, value });
      ownedCourses.mutate();
      return result;
    } catch (error) {
      throw new Error(error);
    } finally {
      setBusyCourseId(null);
    }
  };

  const purchaseCourse = async (order, course) => {
    const hexCourseId = web3.utils.utf8ToHex(course.id);

    const orderHash = web3.utils.soliditySha3(
      {
        type: "bytes16",
        value: hexCourseId,
      },
      { type: "address", value: account.data }
    );

    const value = web3.utils.toWei(String(order.price));

    setBusyCourseId(course.id);

    if (isNewPurchase) {
      const emailHash = web3.utils.sha3(order.email);
      const proof = web3.utils.soliditySha3(
        {
          type: "bytes32",
          value: emailHash,
        },
        { type: "bytes32", value: orderHash }
      );

      _purchaseCourse(hexCourseId, proof, value);
    }
  };

  return (
    <div className="px-4 md:max-w-7xl mx-auto xl:px-0 mt-10">
      <div className="py-4">
        <MarketHeader />
      </div>

      <CourseList courses={courses}>
        {(course) => {
          const owned = ownedCourses?.lookup[course.id];

          return (
            <CourseCard
              disabled={!hasConnectedWallet}
              key={course.id}
              course={course}
              state={owned?.state}
              Footer={() => {
                if (requireInstall) {
                  return (
                    <Button size="sm" variant="primary" disabled={true}>
                      Install
                    </Button>
                  );
                }

                if (isConnecting) {
                  return (
                    <Button size="sm" variant="secondary" disabled={true}>
                      Loading ...
                    </Button>
                  );
                }

                if (!ownedCourses.hasInitialResponse) {
                  return (
                    <Button variant="white" disabled={true} size="sm">
                      Loading State ...
                    </Button>
                  );
                }

                const isBusy = busyCourseId === course.id;

                if (owned) {
                  return (
                    <>
                      <div className="flex">
                        <Button
                          onClick={() => router.push(`/courses/${course.slug}`)}
                          size="sm"
                          variant="success"
                          className="mt-4 mr-2"
                          disabled={owned.state === "deactivated"}
                        >
                          View course &#10004;
                        </Button>
                        {owned.state === "deactivated" && (
                          <Button
                            onClick={() => {
                              setIsNewPurchase(false);
                              setSelectedCourse(course);
                            }}
                            size="sm"
                            variant="error"
                            disabled={false}
                            className="mt-4"
                          >
                            Fund to activate
                          </Button>
                        )}
                      </div>
                    </>
                  );
                }

                return (
                  <Button
                    onClick={() => setSelectedCourse(course)}
                    variant="primary"
                    size="sm"
                    className="mt-4"
                    disabled={!hasConnectedWallet}
                  >
                    Purchase
                  </Button>
                );
              }}
            />
          );
        }}
      </CourseList>
      <Modal
        onClose={cleanUpModal}
        course={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        setIsNewPurchase={setIsNewPurchase}
        isNewPurchase={isNewPurchase}
        onSubmit={(formData, course) => {
          purchaseCourse(formData, course);
        }}
      />
    </div>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();

  return { props: { courses: data } };
}

Marketplace.Layout = BaseLayout;
