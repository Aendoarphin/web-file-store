import { useEffect, useState } from "react";
import supabase from "./utils/supabase";
import Home from "./components/Home";

function App() {
  const [users, setUsers] = useState<any[] | null>(null);
  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const { data } = await supabase.from("users").select();
    setUsers(data);
  }

  return (
    <>
      <Home />
    </>
  )

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