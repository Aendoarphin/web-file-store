// Hook to run test functions
import { useEffect } from "react";
import supabaseAdmin from "../utils/supabase-admin";

const useTest = () => {
  useEffect(() => {
    try {
      console.log("Running test hook...");
      
      const testFunction = async () => {
        // First check if we have a user in localStorage
        const sbUserData = localStorage.getItem("sbuser");
        
        // If no user data exists, exit early
        if (!sbUserData) {
          alert("No user found in localStorage");
          return;
        }
        
        // Safely parse the user data
        let userId;
        try {
          const parsedData = JSON.parse(sbUserData);
          userId = parsedData?.user?.id;
          
          if (!userId) {
            alert("User ID not found in localStorage data");
            return;
          }
        } catch (parseError) {
          alert("Error parsing user data: " + parseError);
          return;
        }
        
        // Fetch users from Supabase
        const {
          data: { users },
          error,
        } = await supabaseAdmin.auth.admin.listUsers();
        
        if (error) {
          console.log(error);
          alert("Error fetching users: " + error.message);
          return;
        }
        
        // Find the user and get sign-in time
        const userSignedIn = users.find(
          (user) => user.id === userId
        )?.last_sign_in_at;
        
        // Check if user is an admin
        const adminResult = await supabaseAdmin
          .from("administrators")
          .select("admin_user_id")
          .eq("admin_user_id", userId);
          
        const adminUser = adminResult.data && adminResult.data[0];
        const userAdminId = adminUser && adminUser.admin_user_id;
        
        // Display the information
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
      
      // Only run if localStorage has items, and do so safely
      if (localStorage.length > 0) {
        testFunction();
      }
    } catch (error) {
      alert("Unexpected error: " + error);
    }
  }, []);
};

export default useTest;