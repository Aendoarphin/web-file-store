// Hook to run test functions
import { useEffect, useState } from "react";
import supabaseAdmin from "../utils/supabase-admin";

const useTest = () => {
  const [userId] = useState<string>(
    JSON.parse(localStorage.getItem("sbuser")!).user.id
  );

  useEffect(() => {
    console.log("Running test hook...");
    const testFunction = async () => {
      const {
        data: { users },
        error,
      } = await supabaseAdmin.auth.admin.listUsers();
      if (error) {
        console.log(error);
      }

      // Get the user ID in local storage and compare against supabase data
      const lsUserId = JSON.parse(localStorage.getItem("sbuser")!).user.id;
      const isAdmin = await supabaseAdmin
        .from("administrators")
        .select("admin_user_id")
        .eq("admin_user_id", lsUserId);
      alert(
        "Number of users: " +
          JSON.stringify(users.length) +
          "\n" +
          userId +
          "\n" +
          "Admins: " +
          JSON.stringify(isAdmin.data?.length)
      );
    };
    testFunction();
  }, []);
};

export default useTest;
