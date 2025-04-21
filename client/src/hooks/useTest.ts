// Hook to run test functions
import { useEffect } from "react";
import { createNewUser } from "../utils/actions";

const useTest = () => {
  useEffect(() => {
    try {
      console.log("Running test hook...");
      
      const testFunction = async () => {
        await createNewUser("aronp2000@gmail.com", "Amber#1", "Arhon", "Admin", "IT");
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