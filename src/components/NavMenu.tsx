import { useState } from "react";
import NavItems from "./NavItems";

const NavMenu = () => {
  // State for navbar
  const [nav, setNav] = useState(false);
  return (
    <>
    <div className="h-[100vh] flex">
          <button onClick={() => setNav(!nav)} className="h-1/1 bg-neutral-300">
            <p className="-rotate-90 font-semibold w-8 text-nowrap hover:scale-95 transition-all">
              {nav ? "Close" : "Open"} Menu
            </p>
          </button>
          <div
            className={`${
              nav ? "w-[200px]" : "w-0"
            } overflow-hidden bg-neutral-200 shadow-[inset_0_-2px_5px_rgba(0,0,0,0.3)]`}
          >
            <NavItems />
          </div>
        </div>
    </>
  )
}

export default NavMenu