import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router";
import { createContext, useState } from "react";

const UserContext = createContext<string>("");

// React routing occurs here
function App() {
  const [user, setUser] = useState("");

  // Check if the user is logged in and set the user state accordingly

  return (
    <>
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="not-found" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
