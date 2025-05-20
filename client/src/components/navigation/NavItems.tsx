import {
  IconDatabase,
  IconHome,
  IconLogout,
  IconSettings,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import supabase from "../../utils/supabase";
import { BrandContext } from "../../contexts/Context";

const NavItems = ({ navState }: { navState: boolean }) => {
  const navigate = useNavigate();

  const [style] = useState<string>(
    "hover:bg-[rgba(0,0,0,0.1)] transition-all ease-in-out cursor-pointer px-4 py-2 font-semibold flex flex-nowrap gap-4"
  );
  const [modal, setModal] = useState(false);

  const { brand } = useContext(BrandContext) as { brand: string };

  const handleSignOut = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log({
          code: error.code,
          message: error.message,
          name: error.name,
          stack: error.stack,
          status: error.status,
        });
      }
      localStorage.removeItem("sb-snvcvbztmwsqqyegkzqu-auth-token");
      navigate("/auth/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ol className={`${navState ? "fixed left-9" : ""}`}>
				<Link to="/" className="flex w-full py-2 items-center gap-2 justify-center">
          <h4 className="font-semibold">{brand}</h4>
          <p className="font-semibold text-sm">File Store</p>
        </Link>
        <li className={style} onClick={() => navigate("/")}>
          <IconHome /> Home
        </li>
        <li className={style} onClick={() => navigate("/my-account")}>
          <IconUser /> My Account
        </li>
        <li className={style} onClick={() => navigate("admin/users")}>
          <IconUsersGroup /> Users
        </li>
        <li className={style} onClick={() => navigate("/files")}>
          <IconDatabase /> Files
        </li>
        <li className={style} onClick={() => navigate("/settings")}>
          <IconSettings /> Settings
        </li>
        <li className={style} onClick={() => setModal(true)}>
          <IconLogout /> Sign Out
        </li>
      </ol>
      {modal && (
        <div className="z-50 backdrop-blur-sm w-full h-full fixed top-0 left-0 backdrop-brightness-50">
          <div className="rounded-sm bg-neutral-300 p-6 fixed self-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <h4 className="font-semibold text-lg mb-2">Sign Out</h4>
            <hr className="mb-4" />
            <p className="font-semibold pb-4 text-nowrap">
              Are you sure you want to log out?
            </p>
            <div className="w-min flex gap-2 flex-nowrap mx-auto">
              <button
                className="px-2 py-1 rounded-sm hover:scale-95 bg-neutral-700 text-white"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-2 py-1 rounded-sm hover:scale-95 bg-red-700 text-white"
                onClick={handleSignOut}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
