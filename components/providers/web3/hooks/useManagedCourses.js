import { normalizeOwnedCourse } from "@utils/normalize";
import useSWR from "swr";

export const handler = (web3, contract) => (account) => {
  const swrRes = useSWR(
    () =>
      web3 && contract && account.data && account.isAdmin
        ? `web3/manageCourses/${account.data}`
        : null,
    async () => {
      const courses = [];
      const courseCount = await contract.methods.getCourseCount().call();

      for (let i = Number(courseCount) - 1; i >= 0; i--) {
        const coursehash = await contract.methods
          .getCourseHashAtIndex(i)
          .call();

        const course = await contract.methods
          .getCourseByHash(coursehash)
          .call();

        if (course) {
          const normalized = normalizeOwnedCourse(web3)(
            { hash: coursehash },
            course
          );
          courses.push(normalized);
        }
      }

      return courses;
    }
  );

  return swrRes;
};
