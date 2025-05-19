import {
	IconDatabase,
	IconHome,
	IconLogout,
	IconSettings,
	IconUser,
	IconUsersGroup,
} from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../../utils/supabase";

const NavItems = ({ navState }: { navState: boolean }) => {
	const navigate = useNavigate();

	const [style] = useState<string>(
		"hover:bg-[rgba(0,0,0,0.1)] transition-all ease-in-out cursor-pointer px-4 py-2 font-semibold flex flex-nowrap gap-4"
	);

	const handleSignOut = async (e: React.FormEvent) => {
		try {
			e.preventDefault();
			const { error } = await supabase.auth.signOut();
			if (error) {
				console.log({
					code: error.code,
					message: error.message,
					name: error.name,
					stack: error.stack,
					status: error.status,
				});
			}
			localStorage.removeItem("sbuser");
			navigate("/auth/signin");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<ol className={`${navState ? "fixed left-9" : ""}`}>
				<li className={style} onClick={() => navigate("/")}>
					<IconHome /> Home
				</li>
				<li className={style} onClick={() => navigate("/my-account")}>
					<IconUser /> My Account
				</li>
				<li className={style} onClick={() => navigate("admin/users")}>
					<IconUsersGroup /> Users
				</li>
				<li className={style} onClick={() => navigate("/files")}>
					<IconDatabase /> Files
				</li>
				<li className={style} onClick={() => navigate("/settings")}>
					<IconSettings /> Settings
				</li>
				<li className={style} onClick={handleSignOut}>
					<IconLogout /> Sign Out
				</li>
			</ol>
		</>
	);
};

export default NavItems;
