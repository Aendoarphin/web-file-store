import { IconDatabase, IconUsersGroup } from "@tabler/icons-react";
import { useState } from "react";

const NavItems = () => {
  const [style] = useState<string>(
    "hover:scale-105 transition-all ease-in-out cursor-pointer px-4 py-2 font-semibold flex flex-nowrap gap-4"
  );
  
  return (
    <>
      <ol>
        <li className={style}>
          <IconUsersGroup /> Users
        </li>
        <li className={style}>
          <IconDatabase /> Files
        </li>
      </ol>
    </>
  );
};

export default NavItems;
