import { useAdmin, useManagedCourses } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import BaseLayout from "@components/ui/common/layout/base";
import { CourseCard, CourseFilter, ManagedCard } from "@components/ui/course";
import { MarketHeader } from "@components/ui/marketplace";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Message } from "@components/ui/common";
import { useRouter } from "next/router";
import { normalizeOwnedCourse } from "@utils/normalize";

const VerificationInput = ({ onVerify }) => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex mr-2 relative rounded-md">
      <input
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        type="email"
        name="account"
        id="account"
        className="input input-primary input-bordered mr-2"
        placeholder="0x2341ab..."
      />
      <Button
        onClick={() => {
          onVerify(email);
        }}
      >
        Verify
      </Button>
    </div>
  );
};

const ManageCourses = () => {
  const { web3, contract } = useWeb3();
  const router = useRouter();
  const { account } = useAdmin({ redirectTo: "/marketplace" });
  const { managedCourses } = useManagedCourses(account);
  const [proofedOwnerShip, setProofedOwnerShip] = useState({});
  const [searchedCourse, setSearchedCourse] = useState(null);
  const [filters, setFilters] = useState({ name: "All" });

  useEffect(() => {
    if (!account.isAdmin) {
      router.push("/marketplace");
    }
  }, [router, account]);

  const changeCourseState = async (courseHash, method) => {
    try {
      await contract.methods[method](courseHash).send({ from: account.data });
    } catch (error) {
      console.error(error.message);
    }
  };

  const activateCourse = (courseHash) => {
    changeCourseState(courseHash, "activateCourse");
  };

  const deactivateCourse = (courseHash) => {
    changeCourseState(courseHash, "deactivateCourse");
  };

  const searchCourse = async (hash) => {
    const re = /[0-9A-Fa-f]{6}/g;
    if (hash && hash.length === 66 && re.test(hash)) {
      const course = await contract.methods.getCourseByHash(hash).call();

      if (course.owner !== "0x0000000000000000000000000000000000000000") {
        const normalized = normalizeOwnedCourse(web3)({ hash }, course);
        setSearchedCourse(normalized);
        return;
      }

      setSearchedCourse(null);
    }
  };

  const verifyCourse = (email, { hash, proof }) => {
    if (!email) {
      return;
    }
    const emailHash = web3.utils.sha3(email);
    const proofToCheck = web3.utils.soliditySha3(
      {
        type: "bytes32",
        value: emailHash,
      },
      {
        type: "bytes32",
        value: hash,
      }
    );

    proofToCheck === proof
      ? setProofedOwnerShip({ ...proofedOwnerShip, [hash]: true })
      : setProofedOwnerShip({ ...proofedOwnerShip, [hash]: false });
  };

  const renderCard = (course, isSearched) => {
    return (
      <ManagedCard key={course.ownedCourseId} course={course}>
        <div className="flex mr-2 relative rounded-md">
          <VerificationInput
            onVerify={(email) => {
              verifyCourse(email, {
                hash: course.hash,
                proof: course.proof,
              });
            }}
          />
        </div>
        {proofedOwnerShip[course.hash] && (
          <div className="mt-2">
            <Message type="success">Verified!</Message>
          </div>
        )}
        {proofedOwnerShip[course.hash] === false && (
          <div className="mt-2">
            <Message type="danger">Wrong Proof!</Message>
          </div>
        )}

        {course.state === "purchased" && (
          <div className="mt-2">
            <Button
              onClick={() => activateCourse(course.hash)}
              variant="primary"
              size="sm"
              className="mr-2 mt-2"
            >
              Activate
            </Button>
            <Button
              onClick={() => deactivateCourse(course.hash)}
              variant="error"
              size="sm"
            >
              Deactivate
            </Button>
          </div>
        )}
      </ManagedCard>
    );
  };

  const filteredCourses = managedCourses.data
    ?.filter((course) => {
      if (filters.name.toLowerCase() === "all") {
        return true;
      }

      return course.state === filters.name.toLowerCase();
    })
    .map((course) => renderCard(course));

  return (
    <div className="px-4 md:max-w-7xl  mx-auto xl:px-0 mt-4">
      <div className="py-2">
        <MarketHeader />
        <CourseFilter
          onSearchSubmit={searchCourse}
          onFilterSelect={(value) => setFilters(value)}
        />
      </div>
      {searchedCourse && (
        <div>
          <h1 className="text-2xl font-bold p-5">Search</h1>
          <section className="mt-2 w-full  grid gap-5 md:grid-cols-2  lg:grid-cols-2">
            <div>{renderCard(searchedCourse)}</div>
          </section>
        </div>
      )}
      <h1 className="text-2xl font-bold mt-4 p-5">All Courses:</h1>
      <section className="mt-2 w-full  grid gap-5 md:grid-cols-2  lg:grid-cols-2">
        {filteredCourses}
      </section>

      {filteredCourses?.length === 0 && (
        <Message type="warning">No courses to display</Message>
      )}
    </div>
  );
};

export default ManageCourses;

ManageCourses.Layout = BaseLayout;
