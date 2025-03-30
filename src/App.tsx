import Home from "./components/Home";
import FormSignIn from "./components/FormSignIn";
import NotFound from "./components/NotFound";
import { Routes, Route } from "react-router";
import FormConfirmPassword from "./components/FormConfirmPassword";
import FormSignUp from "./components/FormSignUp";
import FormSendReset from "./components/FormSendReset";
import { useState, createContext, useEffect } from "react";
import supabase from "./utils/supabase";
import { Session } from "@supabase/supabase-js";

export const SessionContext = createContext<Session | null>(null);

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      alert("Event: " + event + " Session: " + session);
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
          <Route path="/auth/confirm" element={<FormConfirmPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SessionContext.Provider>
    </>
  );
}

export default App;
