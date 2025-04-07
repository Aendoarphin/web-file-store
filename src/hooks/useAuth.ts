import { useState, useEffect, useContext } from "react";
import { SessionContext } from "../App";

const useAuth = () => {
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    const session: any = useContext(SessionContext);
  setUser(session?.user?.email)
  }, []);

  return user;
};

export default useAuth;
