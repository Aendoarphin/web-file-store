import supabase from "../utils/supabase"
import { useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: user } = await supabase.auth.getUser();
      setUser(user);
    };

    getCurrentUser();
    console.log(user);
  }, []);

  return {user};
}

export default useAuth