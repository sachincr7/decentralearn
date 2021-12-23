const Backdrop = ({ closeSideDraw }) => (
  <div
    onClick={closeSideDraw}
    className="fixed w-full h-full bg-slate-200 z-40 top-0 opacity-70"
  />
);

export default Backdrop;
