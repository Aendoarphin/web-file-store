import Home from "./components/Home";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import { Route, Routes } from "react-router";
import { createContext } from "react";

const UserContext = createContext<string>("");

// React routing occurs here
function App() {

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
