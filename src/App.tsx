import Home from "./components/Home";
import FormSignIn from "./components/FormSignIn";
import NotFound from "./components/NotFound";
import { Routes, Route } from "react-router";
import { createContext } from "react";
import useAuth from "./hooks/useAuth";
import FormConfirmPassword from "./components/FormConfirmPassword";
import FormSignUp from "./components/FormSignUp";
import FormSendReset from "./components/FormSendReset";

export const UserContext = createContext<object | null>({});

function App() {

  const user = useAuth()

  return (
    <>
      <UserContext.Provider value={user}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="auth" element={<FormSignIn />} />
          <Route path="auth/signup" element={<FormSignUp />} />
          <Route path="auth/reset" element={<FormSendReset />} />
          <Route path="/auth/new-password" element={<FormConfirmPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
