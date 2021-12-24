import { useWalletInfo } from "@components/hooks/web3";
import { Button } from "@components/ui/common";
import BaseLayout from "@components/ui/common/layout/base";
import { CourseCard, CourseList } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";
import Head from "next/head";
import Link from "next/link";
// import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home({ courses }) {
  const { account } = useWalletInfo();
  // console.log("account", account);
  return (
    <>
      <Head>
        <title>Decentralearn</title>
        <meta
          name="description"
          content="Decentralized platform for learning"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative px-4 pt-16 mx-auto lg:py-32 md:px-8 xl:px-20 sm:max-w-xl md:max-w-full">
        <div className="max-w-xl mx-auto lg:max-w-screen-xl">
          <div className="mb-16 lg:max-w-lg lg:mb-0">
            <div className="max-w-xl mb-6">
              <div>
                <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-400">
                  Brand new
                </p>
              </div>
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                A Decentralized, flexible &{" "}
                {/* <br className="hidden md:block" /> */}
                guided{" "}
                <span className="inline-block text-primary">
                  learning platform.
                </span>
              </h2>
              <p className="text-base text-gray-700 md:text-lg">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae. explicabo.
              </p>
            </div>
            <div className="flex items-center">
              <Link href="/marketplace">
                <Button variant="primary" className="mr-4">
                  Get Started
                </Button>
              </Link>
              <Button className="mr-4">Learn more</Button>
            </div>
          </div>
        </div>
        <div className="flex justify-center h-full overflow-hidden lg:w-2/3 xl:w-1/2 lg:absolute lg:justify-start lg:bottom-0 lg:right-0 lg:items-end">
          <img
            src="https://kitwind.io/assets/kometa/full-browser.png"
            className="object-cover object-top w-full h-64 max-w-xl -mb-16 rounded shadow-2xl lg:ml-64 xl:ml-8 lg:-mb-24 xl:-mb-28 lg:h-auto lg:max-w-screen-md"
            alt=""
          />
        </div>
      </div>
      <div className="px-4 md:max-w-7xl mx-auto xl:px-0">
        <div className="text-center pt-20">
          <h2 className="text-5xl leading-10 tracking-tight font-extrabold text-gray-900">
            Our Courses
          </h2>
        </div>

        <CourseList courses={courses}>
          {(course) => <CourseCard key={course.id} course={course} />}
        </CourseList>
      </div>
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();

  return { props: { courses: data } };
}

Home.Layout = BaseLayout;
