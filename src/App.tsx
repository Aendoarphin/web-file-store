import Home from "./components/Home";
import FormSignIn from "./components/FormSignIn";
import NotFound from "./components/NotFound";
import { Routes, Route } from "react-router";
import { createContext } from "react";
import useAuth from "./hooks/useAuth";
import Password from "./components/FormResetPassword";

export const UserContext = createContext<object | null>({});

function App() {

  const user = useAuth()

  return (
    <>
      <UserContext.Provider value={user}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="auth" element={<FormSignIn />} />
          <Route path="reset" element={<Password />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
