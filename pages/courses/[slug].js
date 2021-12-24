import { useWalletInfo } from "@components/hooks/web3";
// import { useWeb3 } from "@components/providers";
import BaseLayout from "@components/ui/common/layout/base";
import { CourseHero } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";
import Image from "next/image";

export default function Course({ course }) {
  //   const { isLoading } = useWeb3();
  const { account } = useWalletInfo();

  return (
    <>
      <div className="py-4">
        <CourseHero
          title={course && course.title}
          description={course && course.description}
          image={course && course.coverImage}
          wsl={course && course.wsl}
        />
      </div>
    </>
  );
}

export function getStaticPaths({ params }) {
  const { data } = getAllCourses();

  return {
    paths:
      data &&
      data.map((c) => ({
        params: {
          slug: c.slug,
        },
      })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const { data } = getAllCourses();
  const course = data.filter((c) => c.slug === params.slug)[0];

  return { props: { course } };
}

Course.Layout = BaseLayout;
