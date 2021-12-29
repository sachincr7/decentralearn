import { useOwnedCourses, useWalletInfo } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import BaseLayout from "@components/ui/common/layout/base";
import { MarketHeader } from "@components/ui/marketplace";
import Link from "next/link";
import { getAllCourses } from "@content/courses/fetcher";
import { Button, Message } from "@components/ui/common";
import OwnedCourseCard from "@components/ui/course/card/Owned";

export default function OwnedCourses({ courses }) {
  const { account } = useWalletInfo();
  const { requireInstall } = useWeb3();
  const { ownedCourses } = useOwnedCourses(courses, account.data);

  return (
    <div className="px-4 md:max-w-7xl  mx-auto xl:px-0 mt-10">
      <div className="py-4">
        <MarketHeader />
      </div>

      {ownedCourses.isEmpty && (
        <div className="w-1/2">
          <div className="alert alert-warning">
            <div className="flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-6 h-6 mx-2 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
              <label>
                <div>You don&apos;t own any courses</div>
                <Link href="/marketplace">
                  <a className="font-normal hover:underline">
                    <i>Purchase Course</i>
                  </a>
                </Link>
              </label>
            </div>
          </div>
        </div>
      )}
      {account.isEmpty && (
        <div className="w-1/2">
          <Message type="warning">
            <div>Please connect to metamask</div>
          </Message>
        </div>
      )}
      {requireInstall && (
        <div className="w-1/2">
          <Message type="warning">
            <div>Please install metamask</div>
          </Message>
        </div>
      )}

      {ownedCourses &&
        ownedCourses.data &&
        ownedCourses.data.map((course) => (
          <OwnedCourseCard key={course.id} course={course}>
            <Button variant="primary">Watch the course</Button>
          </OwnedCourseCard>
        ))}
    </div>
  );
}

OwnedCourses.Layout = BaseLayout;
