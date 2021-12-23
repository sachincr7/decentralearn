import Image from "next/image";
import Link from "next/link";

import React from "react";

const Card = ({ course, disabled }) => {
  return (
    <div className="rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48 w-full">
        {/* <img className="h-48 w-full object-cover" src={course.coverImage} /> */}
        <Image
          src={course.coverImage}
          layout="fill"
          alt={course.title}
          className={`object-cover ${disabled && "filter grayscale"}`}
        />
      </div>
      <div className="p-6">
        <div className="flex items-center">
          <p className="text-sm leading-5 font-medium">{course.type}</p>
        </div>

        <h3 className="mt-2 text-medium leading-7 font-semibold text-gray-900 hover:underline">
          <Link href={`/courses/${course.slug}`}>{course.title}</Link>
        </h3>
        <p className="mt-3 text-base leading-6 text-gray-500">
          {course.description}
        </p>
      </div>
    </div>
  );
};

export default Card;
