import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router";

// React routing occurs here
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="not-found" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );


}

export default App;
