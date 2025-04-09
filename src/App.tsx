import Home from "./components/Home";
import FormSignIn from "./components/FormSignIn";
import NotFound from "./components/NotFound";
import { Routes, Route } from "react-router";
import FormSignUp from "./components/FormSignUp";
import FormSendReset from "./components/FormSendReset";
import { useState, createContext, useEffect } from "react";
import supabase from "./utils/supabase";
import { useNavigate } from "react-router";
import EmailConfirmation from "./components/EmailConfirmation";
import useTest from "./hooks/useTest";
import AdminPanel from "./components/AdminPanel";
import FormResetPassword from "./components/FormResetPassword";

export const SessionContext = createContext<object | null>(null);

function App() {
  const navigate = useNavigate();
  const [session, setSession] = useState<object | null>(null);

  useTest(); 

  useEffect(() => {
    const session = localStorage.getItem("sbuser");
    setSession(JSON.parse(session || "null"));
    console.log(session);

    // Only redirect if we're not already on email confirm message, signup, or reset
    const currentPath = window.location.pathname;
    if (
      !currentPath.includes("email-confirmation") &&
      !currentPath.includes("signup") &&
      !currentPath.includes("reset-password")
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
      <SessionContext.Provider value={session}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="auth" element={<FormSignIn />} />
          <Route path="auth/signup" element={<FormSignUp />} />
          <Route path="auth/reset" element={<FormSendReset />} />
          <Route
            path="auth/email-confirmation"
            element={<EmailConfirmation />}
          />
          <Route path="auth/reset-password" element={<FormResetPassword />} />
          <Route path="admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SessionContext.Provider>
    </>
  );
}

export default App;
