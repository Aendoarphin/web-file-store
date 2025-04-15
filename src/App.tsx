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

import useTest from "./hooks/useTest";
import MyAccount from "./components/MyAccount";
import Users from "./components/Users";
import Files from "./components/Files";
import Settings from "./components/Settings";

const routes: { [key: string]: React.ReactElement } = {
  "/": <Home />,
  auth: <FormSignIn />,
  "auth/signup": <FormSignUp />,
  "auth/reset": <FormSendReset />,
  "auth/email-confirmation": <EmailConfirmation />,
  "auth/reset-password": <FormResetPassword />,
  admin: <AdminPanel />,
  "session-expired": <SessionExpired />,
  "*": <NotFound />,
  "my-account": <MyAccount />,
  users: <Users />,
  files: <Files />,
  settings: <Settings />,
};

function App() {
  const navigate = useNavigate();

  const [session, setSession] = useState<object | null>(null);
  const [brand, setBrand] = useState<string>("Brand");

  // useTest();

  useEffect(() => {
    // Validate session on every click
    document.addEventListener("click", function () {
      console.log("Checking session...");
      const user = JSON.parse(localStorage.getItem("sbuser")!);
      const expired =
        user &&
        user.user &&
        localStorage.length > 0 &&
        isExpired(user.user.last_sign_in_at);
      if (expired) {
        localStorage.removeItem("sbuser");
        document.location.href = "/session-expired";
      }
    });

    const session = localStorage.getItem("sbuser");
    setSession(JSON.parse(session || "null"));

    // Only redirect if we're not already on email confirm message, signup, or reset
    const currentPath = window.location.pathname;
    if (
      !currentPath.includes("email-confirmation") &&
      !currentPath.includes("signup") &&
      !currentPath.includes("reset-password") &&
      !currentPath.includes("session-expired")
    ) {
      if (session) {
        navigate("/");
      } else {
        navigate("auth");
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // alert("User: " + session?.user?.email + " Event: " + event);
      if (event === "SIGNED_IN") {
        localStorage.setItem("sbuser", JSON.stringify(session));
      } else if (event === "SIGNED_OUT") {
        localStorage.removeItem("sbuser");
      }
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <>
      <UserContext.Provider value={session}>
        <BrandContext.Provider value={{ brand, setBrand }}>
          <div className="flex flex-row flex-nowrap z-50">
            {localStorage.getItem("sbuser") && <NavMenu />}
            <div className="w-full">
              <Routes>
                {Object.keys(routes).map((route) => (
                  <Route
                    key={route}
                    path={route}
                    element={routes[route]}
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
