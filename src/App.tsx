import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { Route, Routes } from "react-router";
import { createContext, useEffect } from "react";
import { supabase, supabaseAuth } from "./utils/supabase";

const UserContext = createContext<string>("");

function App() {

	useEffect(() => {
		const getAllUsers = async () => {
			const { data } = await supabase.auth.admin.listUsers();
			console.log(data.users);
		};
		getAllUsers();
	}, []);

	return (
		<>
			<UserContext.Provider value={"user"}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</UserContext.Provider>
		</>
	);
}

export default App;
