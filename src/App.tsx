import { useEffect, useState } from "react";
import supabase from "./utils/supabase";
import Home from "./components/Home";
import Results from "./components/Results";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  // async function getUsers() {
  //   const { data } = await supabase.from("users").select();
  //   setUsers(data);
  // }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/search" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </>
  );

  // return (
  //   <ul>
  //     {users && users.map((user) => (
  //       <p key={user.id}>
  //         {user.id}
  //         <br />
  //         {user.first_name}
  //         <br />
  //         {user.last_name}
  //         <br />
  //         {user.username}
  //         <br />
  //         {user.email}
  //         <br />
  //         <br />
  //       </p>
  //     ))}
  //   </ul>
  // );
}

export default App;
