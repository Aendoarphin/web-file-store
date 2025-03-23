import { useEffect, useState } from "react";

export const useGetUser = () => {
	const [user, setUser] = useState<string>();

	useEffect(() => {
		setUser("");
    // read browser storage for user info
    // read supabase for existing sessions and users
	}, []);

  return user;
};
