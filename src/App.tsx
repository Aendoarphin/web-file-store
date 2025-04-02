import Home from "./components/Home";
import FormSignIn from "./components/FormSignIn";
import NotFound from "./components/NotFound";
import { Routes, Route } from "react-router";
import FormConfirmPassword from "./components/FormConfirmPassword";
import FormSignUp from "./components/FormSignUp";
import FormSendReset from "./components/FormSendReset";
import { useState, createContext, useEffect } from "react";
import supabase from "./utils/supabase";
import { useNavigate } from "react-router";

export const SessionContext = createContext<object | null>(null);

function App() {
  const navigate = useNavigate();
	const [session, setSession] = useState<object | null>(null);

	useEffect(() => {
    const session = localStorage.getItem("tokens");
    setSession(JSON.parse(JSON.stringify(localStorage.getItem("tokens"))));
    console.log(session)

    if (session) {
      navigate("/");
    } else {
      navigate("/auth");
    }
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, session) => {
			alert("User: " + session?.user?.email + " Event: " + event);
			if (event === "SIGNED_IN") {
				setSession({
					accessToken: session?.access_token,
					refreshToken: session?.refresh_token,
				});
				localStorage.setItem("tokens", JSON.stringify(session));
			} else if (event === "SIGNED_OUT") {
        localStorage.removeItem("tokens")
      }
		});
		return () => subscription.unsubscribe();
	}, []);

  // continue here; fix auth flow

	return (
		<>
			<SessionContext.Provider value={session}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="auth" element={<FormSignIn />} />
					<Route path="auth/signup" element={<FormSignUp />} />
					<Route path="auth/reset" element={<FormSendReset />} />
					<Route path="auth/confirm" element={<FormConfirmPassword />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</SessionContext.Provider>
		</>
	);
}

export default App;
