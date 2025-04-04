// Hook to run test functions
import { useEffect } from "react";
import supabaseAdmin from "../utils/supabase-admin";

const useTest = () => {
  useEffect(() => {
    console.log("Running test hook...");
    const getAllUsers = async () => {
      const {
        data: { users },
        error,
      } = await supabaseAdmin.auth.admin.listUsers();
      if (error) {
        console.log(error);
      }
      alert("Number of users: " + JSON.stringify(users.length));
    };
    getAllUsers();
  }, []);
};

export default useTest;
