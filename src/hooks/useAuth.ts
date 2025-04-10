import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

const useAuth = () => {
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    const session: any = useContext(UserContext);
  setUser(session?.user?.email)
  }, []);

  return user;
};

export default useAuth;
