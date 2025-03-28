import { useState } from "react";
import { validatePassword } from "../scripts/helper";

const FormConfirmPassword = () => {
	const [password, setPassword] = useState<string>("");
	const [confirmedPassword, setConfirmedPassword] = useState<string>("");
	const [validPassword, setValidPassword] = useState<boolean>(false);
	const [validConfirmedPassword, setValidConfirmedPassword] =
		useState<boolean>(false);
	const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);

	// Track individual validation requirements
	const [validations, setValidations] = useState({
		length: false,
		uppercase: false,
		number: false,
		specialChar: false,
	});

	const checkPasswordRequirements = (password: string) => {
		const requirements = {
			length: password.length >= 6,
			uppercase: /[A-Z]/.test(password),
			number: /\d/.test(password),
			specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
		};
		setValidations(requirements);

		return Object.values(requirements).every(Boolean); // Return true if all conditions are met
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newPassword = e.target.value;
		setPassword(newPassword);
		const isValid = checkPasswordRequirements(newPassword);
		setValidPassword(isValid);
		setPasswordsMatch(newPassword === confirmedPassword);
	};

	const handleConfirmPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const newConfirmedPassword = e.target.value;
		setConfirmedPassword(newConfirmedPassword);
		const isValid = validatePassword(newConfirmedPassword);
		setValidConfirmedPassword(isValid);
		setPasswordsMatch(password === newConfirmedPassword);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (validPassword && validConfirmedPassword && passwordsMatch) {
			// continue here and update supabase user password
			alert(`Password is: ${password}`);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="flex w-min text-nowrap mx-auto items-baseline gap-2 mt-20">
				<h1 className="font-semibold">S O P Y</h1>
				<p className="font-semibold">File Store</p>
			</div>
			<div className="flex flex-col mt-10 mx-auto items-center gap-4 p-8 rounded-md bg-neutral-200 w-74">
				<h4 className="font-semibold text-center">Reset Password</h4>
				<div className="text-xs mx-6">
					<ul>
						<li
							className={validations.length ? "text-green-600" : "text-red-500"}
						>
							At least 6 characters long
						</li>
						<li
							className={
								validations.uppercase ? "text-green-600" : "text-red-500"
							}
						>
							At least one uppercase letter (A-Z)
						</li>
						<li
							className={validations.number ? "text-green-600" : "text-red-500"}
						>
							At least one number (0-9)
						</li>
						<li
							className={
								validations.specialChar ? "text-green-600" : "text-red-500"
							}
						>
							At least one special character Example: (!@#$%^&amp;*(),.?":{}
							|&lt;&gt;)
						</li>
						<li className={passwordsMatch ? "text-green-600" : "text-red-500"}>
							Passwords match
						</li>
					</ul>
				</div>
				<input
					onChange={handlePasswordChange}
					type="password"
					placeholder="Create New Password"
					required
					className="border-neutral-400 border-b focus:outline-none focus:border-black"
				/>
				<input
					onChange={handleConfirmPasswordChange}
					type="password"
					placeholder="Confirm New Password"
					required
					className="border-neutral-400 border-b focus:outline-none focus:border-black"
				/>
				<input
					disabled={
						!(validPassword && validConfirmedPassword && passwordsMatch)
					}
					type="submit"
					value="Submit"
					className="bg-black cursor-pointer text-white p-2 rounded px-10 disabled:contrast-50 mt-2"
				/>
			</div>
		</form>
	);
};

export default FormConfirmPassword;
