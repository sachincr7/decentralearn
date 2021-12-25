import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import React from "react";

const Card = ({ course, disabled, Footer }) => {
  return (
    <div className="rounded-lg shadow-lg bg-white overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={course.coverImage}
          layout="fill"
          alt={course.title}
          className={`object-cover ${disabled && "filter grayscale"}`}
        />
      </div>
      <div className="p-6">
        <div className="flex flex-col justify-between">
          <div className="h-48">
            <div className="flex items-center">
              <p className="text-sm leading-5 font-medium">{course.type}</p>
            </div>

            <h3 className="mt-2  text-medium leading-7 font-semibold text-gray-900 hover:underline">
              <Link href={`/courses/${course.slug}`}>{course.title}</Link>
            </h3>
            <p className="mt-3 text-base leading-6 text-gray-500">
              {course.description}
            </p>
          </div>
          <div>{Footer && <Footer />}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
