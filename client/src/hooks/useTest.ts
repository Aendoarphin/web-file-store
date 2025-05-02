// Hook to run test functions
import { useEffect } from "react";
import { listAllUsers } from "../utils/actions";

const useTest = () => {
  useEffect(() => {
    try {
      const test = async () => {
        const allUsers = await listAllUsers();
        alert(JSON.stringify(allUsers, null, 2));
      };
      test();
    } catch (error) {
      alert("Unexpected error: " + error);
    }
  }, []);
};

export default useTest;
