import { useEffect, useState } from "react";
import { getRecord } from "../utils/database";

export const useGetUser = () => {
	const [user, setUser] = useState<string>();

	useEffect(() => {
		const getUserFromSessions = () => {
      const userCookieId = document.cookie || "no cookies"
      const sessionsData = getRecord("sessions", "user_id", cookieId);
      console.log(userCookieId)
    }
    getUserFromSessions();
	}, []);

  return user;
};


// document.cookie = "sopy-user=1; expires=" + new Date(Date.now() + 3600 * 1000).toUTCString() + "; path=/";

