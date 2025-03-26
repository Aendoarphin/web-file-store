import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { Routes, Route, Navigate } from "react-router";
import { createContext } from "react";
import useAuth from "./hooks/useAuth";

export const UserContext = createContext<object | null>({});

function App() {

  const { user } = useAuth()

  // continue here; work with auth.admin namespace
  // and set up user management functions for app init

  return (
    <>
      <UserContext.Provider value={user}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="not-found" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
