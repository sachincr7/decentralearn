import { useWalletInfo } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import BaseLayout from "@components/ui/common/layout/base";
import { CourseCard, CourseList } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";

export default function Marketplace({ courses }) {
  const { hasConnectedWallet, account, network } = useWalletInfo();
  const { requireInstall } = useWeb3();

  return (
    <div className="px-4 md:max-w-7xl mx-auto xl:px-0 mt-10">
      <div className="pt-4 shadow-lg">
        <section className="text-white bg-indigo-600 rounded-lg">
          <div className="p-8">
            <h1 className="truncate">Hello, {account?.data}</h1>
            <h2 className="subtitle mb-5 text-xl">
              I hope you are having a great day!
            </h2>
            <div className="md:flex justify-between items-center">
              <div className="sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
                  >
                    Learn how to purchase
                  </a>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                {network.hasInitialResponse && !network.isSupported && (
                  <div className="bg-red-400 p-4 rounded-lg">
                    <div>Connected to wrong network</div>
                    <div>
                      Connect to: {` `}
                      <strong className="text-2xl">{network.target}</strong>
                    </div>
                  </div>
                )}
                {requireInstall && (
                  <div className="bg-yellow-500 p-4 rounded-lg">
                    Cannot connect to network. Please install Metamask.
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <div className="p-8">
            <h1 className="text-2xl">Hello, {account.data}</h1>
            <h2 className="subtitle mb-5 text-xl">
              I hope you are having a great day!
            </h2>
            <div className="flex justify-between items-center">
              <div className="sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
                  >
                    Learn how to purchase
                  </a>
                </div>
              </div>
              <div>
                {network.hasInitialResponse && !network.isSupported && (
                  <div className="bg-red-400 p-4 rounded-lg">
                    <div>Connected to wrong network</div>
                    <div>
                      Connect to: {` `}
                      <strong className="text-2xl">{network.target}</strong>
                    </div>
                  </div>
                )}
                {requireInstall && (
                  <div className="bg-yellow-500 p-4 rounded-lg">
                    Cannot connect to network. Please install Metamask.
                  </div>
                )}
              </div>
            </div>
          </div> */}
        </section>
      </div>

      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            disabled={!hasConnectedWallet}
            key={course.id}
            course={course}
          />
        )}
      </CourseList>
    </div>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();

  return { props: { courses: data } };
}

Marketplace.Layout = BaseLayout;
