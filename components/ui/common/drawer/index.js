import Link from "next/link";

const SideDrawer = ({ show }) => {
  return (
    <nav
      className={`h-full ${
        !show ? "w-0" : "w-2/3"
      } bg-white shadow-lg transition ease-in-out delay-150 duration-300 fixed top-0 left-0  z-50 drawer-side`}
    >
      <ul className="menu text-base-content">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/marketplace">Marketplace</Link>
        </li>
        {/* <li>
          <a href="/">Products</a>
        </li> */}
      </ul>
    </nav>
  );
};

export default SideDrawer;
