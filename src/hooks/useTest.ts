// Hook to run test functions
import { useEffect } from "react";
import supabaseAdmin from "../utils/supabase-admin";

const useTest = () => {
  useEffect(() => {
    try {
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
        const userId = JSON.parse(localStorage.getItem("sbuser")!).user.id;
        const userSignedIn = users.find(
          (user) => user.id === userId
        )?.last_sign_in_at;
        const adminUser = await supabaseAdmin
          .from("administrators")
          .select("admin_user_id")
          .eq("admin_user_id", userId)
          .then((res) => res.data && res.data[0]);

        const userAdminId = adminUser && adminUser.admin_user_id;

        alert(
          "Total Users: " +
            JSON.stringify(users.length) +
            "\n" +
            "Local Storage UID: " +
            userId +
            "\n" +
            "Admin User ID: " +
            JSON.stringify(userAdminId) +
            "\n" +
            "Identical types: " +
            (typeof userAdminId === typeof userId) +
            "\n" +
            "Signed in at: " +
            JSON.stringify(userSignedIn)
        );
      };
      if (localStorage.length > 0) {
        testFunction();
      }
    } catch (error) {
      alert(error);
    }
  }, []);
};

export default useTest;
