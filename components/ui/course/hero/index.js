import React from "react";
import Image from "next/image";

const Hero = ({ title, description, image, wsl }) => {
  return (
    <div className="">
      <div className="max-w-2xl mx-auto py-10 px-4 grid  grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
        <div className="pt-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-gray-500">{description}</p>

          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {wsl &&
              wsl.map((meta, index) => {
                return (
                  <div key={index} className="border-t border-gray-200 pt-4">
                    {/* <dt className="font-medium text-gray-900">Origin</dt> */}
                    <p className="mt-2 text-sm text-gray-500">{meta}</p>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="shadow-md rounded-md overflow-hidden">
          <Image
            className="object-cover "
            src={image}
            layout="responsive"
            width="100%"
            height="100%"
          />
          {/* <img
            src={image}
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="bg-gray-100 rounded-lg"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
