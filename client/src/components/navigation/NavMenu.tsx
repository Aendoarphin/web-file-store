import { useState, useContext } from "react";
import NavItems from "./NavItems";
import { BrandContext } from "../../contexts/Context";

interface User {
  id: string;
  email: string;
}

const NavMenu = () => {
  const { brand } = useContext(BrandContext) as { brand: string };

  // Current user
  const [currentUser] = useState<User>(
      (localStorage.getItem("sbuser") !== null &&
        localStorage.length > 0 &&
        JSON.parse(localStorage.getItem("sbuser")!).user) ||
        ""
    );
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
      <div className="bg-neutral-300 flex flex-row justify-between fixed bottom-0 w-full left-0">
            <div className="p-2">&copy; {brand} {new Date().getFullYear()}</div>
            <div className="flex flex-row">
            <div className="p-2">ID: {currentUser.id}</div>
            <div className="p-2">Logged in as: {currentUser.email}</div>
            </div>
          </div>
    </>
  );
};

export default NavMenu;
