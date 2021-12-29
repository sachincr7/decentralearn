import { useEthPrice, COURSE_PRICE } from "@components/hooks/useEthPrice";
import Image from "next/image";

export default function EthRates() {
  const { eth } = useEthPrice();
  return (
    <div className="md:flex">
      <div className="card w-full md:w-1/6 shadow-lg compact side bg-base-100 mr-2">
        <div className="flex-row items-center space-x-4 card-body">
          <div className="flex-1">
            {eth.data ? (
              <div className="flex items-center">
                <p className="font-bold text-2xl">1</p>
                <Image
                  layout="fixed"
                  height="35"
                  width="35"
                  src="/small-eth.webp"
                />
                <span className="text-md text-2xl font-bold">
                  = {eth.data}$
                </span>
              </div>
            ) : (
              <div className="w-full flex justify-center">
                {/* <Loader size="md" /> */}
              </div>
            )}
            <p className="text-base-content text-opacity-40">
              Current Eth price
            </p>
          </div>{" "}
        </div>
      </div>
      <div className="card w-full md:w-1/5 shadow-lg compact side mt-2 md:mt-0 bg-base-100">
        <div className="flex-row items-center space-x-4 card-body">
          <div className="flex-1">
            {eth.data ? (
              <div className="flex items-center">
                <span className="text-2xl font-bold">{eth.perItem}</span>
                <Image
                  layout="fixed"
                  height="35"
                  width="35"
                  src="/small-eth.webp"
                />
                <span className="text-md text-2xl font-bold">
                  = {COURSE_PRICE}$
                </span>
              </div>
            ) : (
              <div className="w-full flex justify-center">
                {/* <Loader size="md" /> */}
              </div>
            )}
            <p className="text-base-content text-opacity-40">
              Price per course
            </p>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
