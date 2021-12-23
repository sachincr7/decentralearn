import { Web3Provider } from "@components/providers";
import { useState } from "react";
import Backdrop from "../../backdrop";
import SideDrawer from "../../drawer";
import { Footer, Navbar } from "@components/ui/common";

export default function BaseLayout({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const drawerToggleClickHandler = () => {
    setIsDrawerOpen((prevState) => {
      return !prevState;
    });
  };

  const closeSideDraw = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Web3Provider>
      <div id="app" className=" bg-gray-100">
        <Navbar
          drawerToggleClickHandler={drawerToggleClickHandler}
          isDrawerOpen={isDrawerOpen}
        />
        <SideDrawer show={isDrawerOpen} />
        {isDrawerOpen && <Backdrop closeSideDraw={closeSideDraw} />}
        <div className="fit">{children}</div>
      </div>
      {/* <Footer /> */}
    </Web3Provider>
  );
}
