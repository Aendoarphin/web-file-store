import { Outlet } from "react-router";

function Root() {
  // Validate auth here
  return (
    <>
      <Outlet />
    </>
  );
}

export default Root;
