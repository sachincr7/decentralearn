import React, { useState } from "react";
import Link from "next/link";
import { useWeb3 } from "@components/providers";
import { useRouter } from "next/router";
import { Button } from "@components/ui/common";

const Navbar = ({ drawerToggleClickHandler }) => {
  const { connect, isLoading, requireInstall } = useWeb3();
  // const [menuOpen, setMenuOpen] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useRouter();

  return (
    <>
      <header className="sticky top-0 z-10 h-14 flex items-center justify-between bg-stone-800 shadow-md">
        <div className="flex h-14 items-center pl-4">
          {/* <img
            //   className="h-full"
            src="https://www.fivesquid.com/pics/t2/1538397410-97640-2-1.png"
          /> */}
          <Link href="/">
            <h2 className="text-2xl cursor-pointer tracking-tight font-extrabold text-white">
              Decentralearn
            </h2>
          </Link>
        </div>
        {/* <div className="ml-8"></div> */}

        <div className="flex items-center px-4 py-4">
          <div className="hidden sm:block">
            <ul className="flex items-center">
              <li className="mr-6">
                <Link href="/">
                  <button className="btn btn-ghost text-white btn-sm">
                    Home
                  </button>
                </Link>
              </li>
              <li className="mr-6">
                <Link href="/marketplace">
                  <button className="btn btn-ghost btn-sm text-white">
                    Marketplace
                  </button>
                </Link>
              </li>
              {/* <li className="mr-6">
                <button className="btn btn-ghost btn-sm text-white">
                  Blogs
                </button>
              </li>
              <li className="mr-6">
                <button className="btn btn-ghost btn-sm text-white">
                  Wishlist
                </button>
              </li> */}
            </ul>
          </div>
          <div>
            {isLoading ? (
              <button disabled={true} onClick={connect}>
                Loading...
              </button>
            ) : requireInstall ? (
              <button
                className="btn btn-primary"
                onClick={() =>
                  window.open("https://metamask.io/download.html", "_blank")
                }
              >
                Install Metamask
              </button>
            ) : (
              <Button
                onClick={connect}
                size="sm"
                variant="primary"
                className="mr-4"
              >
                Connect
              </Button>
            )}
          </div>

          <button
            onClick={drawerToggleClickHandler}
            className="h-8 w-8 sm:hidden ml-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
