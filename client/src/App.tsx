import Home from "./components/Home";
import FormSignIn from "./components/auth/FormSignIn";
import NotFound from "./components/messages/NotFound";
import { Routes, Route, useNavigate } from "react-router";
import FormSignUp from "./components/auth/FormSignUp";
import FormSendReset from "./components/auth/FormSendReset";
import { useState, useEffect } from "react";
import supabase from "./utils/supabase";
import EmailConfirmation from "./components/auth/EmailConfirmation";
import AdminPanel from "./components/admin/AdminPanel";
import FormResetPassword from "./components/auth/FormResetPassword";
import { isExpired } from "./scripts/helper";
import SessionExpired from "./components/messages/SessionExpired";
import { BrandContext, UserContext } from "./contexts/Context";
import NavMenu from "./components/navigation/NavMenu";
import MyAccount from "./components/MyAccount";
import Users from "./components/Users";
import Files from "./components/Files";
import Settings from "./components/Settings";
import FormEditUser from "./components/admin/FormEditUser";
import FormCreateUser from "./components/admin/FormCreateUser";

import useTest from "./hooks/useTest";

import { User } from "@supabase/supabase-js";

const appRoutes: { [key: string]: React.ReactElement } = {
  "/": <Home />,
  "auth/signin": <FormSignIn />,
  "auth/signup": <FormSignUp />,
  "auth/reset": <FormSendReset />,
  "auth/email-confirmation": <EmailConfirmation />,
  "auth/reset-password": <FormResetPassword />,
  admin: <AdminPanel />,
  "session-expired": <SessionExpired />,
  "*": <NotFound />,
  "my-account": <MyAccount />,
  "admin/users": <Users />,
  files: <Files />,
  settings: <Settings />,
  "admin/edit-user": <FormEditUser />,
  "admin/create-user": <FormCreateUser />,
};

function App() {
  const navigate = useNavigate();
  //
  const [currentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("sb-snvcvbztmwsqqyegkzqu-auth-token")!)
  );
  const [brand, setBrand] = useState<string>("Brand");

  // Check if session is expired
  useEffect(() => {
    document.addEventListener("click", function () {
      const parsedUser = JSON.parse(
        localStorage.getItem("sb-snvcvbztmwsqqyegkzqu-auth-token")!
      );
      const expired =
        parsedUser &&
        parsedUser.user &&
        localStorage.length > 0 &&
        isExpired(parsedUser.user.last_sign_in_at);
      if (expired) {
        supabase.auth.signOut();
        // localStorage.removeItem("sb-snvcvbztmwsqqyegkzqu-auth-token");
        navigate("/session-expired");
      }
    });

    // Modified redirect logic to preserve current path
    const currentPath = window.location.pathname;

    // Only redirect if user is not authenticated and trying to access protected routes
    const publicRoutes = [
      "/auth/signin",
      "/auth/signup",
      "/auth/reset",
      "/auth/email-confirmation",
      "/auth/reset-password",
      "/session-expired",
    ];

    const isPublicRoute = publicRoutes.some((route) =>
      currentPath.startsWith(route)
    );

    if (!currentUser && !isPublicRoute) {
      // User is not logged in and trying to access protected route
      navigate("/auth/signin");
    } else if (currentUser && currentPath === "/auth/signin") {
      // User is logged in but on login page
      navigate("/");
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        // localStorage.setItem(
        //   "sb-snvcvbztmwsqqyegkzqu-auth-token",
        //   JSON.stringify(session)
        // );
      } else if (event === "SIGNED_OUT") {
        // localStorage.removeItem("sb-snvcvbztmwsqqyegkzqu-auth-token");
        if (!location.pathname.includes("signin") && !currentUser) {
          navigate("/auth/signin");
        }
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <UserContext.Provider value={currentUser}>
        <BrandContext.Provider value={{ brand, setBrand }}>
          <div className="flex flex-row flex-nowrap z-50">
            {(localStorage.getItem("sb-snvcvbztmwsqqyegkzqu-auth-token") &&
              (location.pathname.includes("email-confirmation") ||
                location.pathname.includes("reset-password"))) ||
            location.pathname.includes("signin") ||
            location.pathname.includes("reset") ||
            location.pathname.includes("session-expired") ? null : (
              <NavMenu />
            )}
            <div className="w-full">
              <Routes>
                {Object.keys(appRoutes).map((route) => (
                  <Route
                    key={route}
                    path={route}
                    element={appRoutes[route]}
                  ></Route>
                ))}
              </Routes>
            </div>
          </div>
        </BrandContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
