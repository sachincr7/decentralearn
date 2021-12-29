import Image from "next/image";

const STATE_COLORS_TEXT = {
  purchased: "badge-info",
  activated: "badge-success",
  deactivated: "badge-error",
};
const STATE_COLORS_BG = {
  purchased: "bg-indigo-200",
  activated: "bg-green-200",
  deactivated: "bg-red-200",
};

export default function OwnedCourseCard({ children, course }) {
  const stateColorText =
    STATE_COLORS_TEXT[course ? course.state : "deactivated"];
  const stateColorBg = STATE_COLORS_BG[course ? course.state : "deactivated"];

  console.log("course", course);

  return (
    <>
      <div className="relative bg-white card lg:card-side card-bordered sm:h-64 my-4 shadow-md">
        <div>
          <img src={course.coverImage} className="h-full w-full object-cover" />
        </div>

        <div className="card-body">
          <h2 className="card-title">
            {course.title}{" "}
            <div className={`badge mx-2 ${stateColorText}`}>
              {course.state.charAt(0).toUpperCase() + course.state.slice(1)}
            </div>
            <p className="font-normal  text-base">{course.price} ETH</p>
          </h2>

          <div>
            <p>
              <span className="font-semibold text-slate-500">Course Id:</span>{" "}
              {course?.ownedCourseId}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold text-slate-500">Proof:</span>{" "}
              {course?.proof}
            </p>
          </div>

          <div className="card-actions">{children}</div>
        </div>
      </div>

      {/* <div classNameName="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
        <div classNameName="block sm:flex">
          <div classNameName="flex-1">
            <div classNameName="next-image-wrapper">
              <Image
                classNameName="object-cover"
                src={course.coverImage}
                width="45"
                height="45"
                layout="responsive"
              />
            </div>
          </div>
          <div classNameName="flex-4">
            <div classNameName="px-4 py-5 sm:px-6">
              <h3 classNameName="text-lg leading-6 font-medium text-gray-900">
                <span classNameName="mr-2">{course.title}</span>
                <span
                  classNameName={`text-xs ${stateColorText} ${stateColorBg} rounded-full p-2`}
                >
                  {course.state}
                </span>
              </h3>
              <p classNameName="mt-1 max-w-2xl text-sm text-gray-500">
                {course.price} ETH
              </p>
            </div>

            <div classNameName="border-t border-gray-200">
              <dl>
                <div classNameName="bg-gray-50 px-4 py-5  sm:px-6">
                  <dt classNameName="text-sm font-medium text-gray-500">
                    Course ID
                  </dt>
                  <dd classNameName="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {course.ownedCourseId}
                  </dd>
                </div>
                <div classNameName="bg-white px-4 py-5 sm:px-6">
                  <dt classNameName="text-sm font-medium text-gray-500">Proof</dt>
                  <dd classNameName="mt-1 text-sm break-words text-gray-900 sm:mt-0 sm:col-span-2">
                    {course.proof}
                  </dd>
                </div>
                <div classNameName="bg-white px-4 py-5 sm:px-6">{children}</div>
              </dl>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
