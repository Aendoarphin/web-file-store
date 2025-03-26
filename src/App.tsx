import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { BrowserRouter, Routes, Route } from "react-router";
import { createContext, useState, useEffect } from "react";
import supabase from "./utils/supabase";

export const UserContext = createContext<object>({});

function App() {
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState<object>({});

  useEffect(() => {
    const getAllUsers = async () => {
      const {
        data: { users },
      } = await supabase.auth.admin.listUsers();
      console.log(users);
    };
    getAllUsers();
  }, []);

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
