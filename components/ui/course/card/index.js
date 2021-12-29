// import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { AnimateKeyframes } from "react-simple-animate";
import React from "react";

const Card = ({ course, disabled, Footer, state }) => {
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
              <p className="text-sm leading-5 font-medium mr-2">
                {course.type}
              </p>
              {state === "activated" && (
                <div className="text-xs text-black bg-green-200 p-1 px-3 rounded-full">
                  Activated
                </div>
              )}
              {state === "deactivated" && (
                <div className="text-xs text-black bg-red-200 p-1 px-3 rounded-full">
                  Deactivated
                </div>
              )}
              {state === "purchased" && (
                <AnimateKeyframes
                  play
                  duration={2.5}
                  keyframes={["opacity:0", "opacity:1"]}
                  iterationCount="infinite"
                >
                  <div className="text-xs text-black bg-yellow-200 p-1 px-3 rounded-full">
                    Waiting for Activation
                  </div>
                </AnimateKeyframes>
              )}
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
