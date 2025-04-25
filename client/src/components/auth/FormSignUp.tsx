import { useState, useContext } from "react";
import { validateEmail } from "../../scripts/helper";
import supabase from "../../utils/supabase";
import { Link } from "react-router";
import { BrandContext } from "../../contexts/Context";

const SignUpForm = () => {
  const { brand } = useContext(BrandContext) as { brand: string };

  // Email state
  const [email, setEmail] = useState<string>("");
  const [isEmail, setIsEmail] = useState<boolean>(false);

  // Password state
  const [password, setPassword] = useState<string>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [validConfirmedPassword, setValidConfirmedPassword] =
    useState<boolean>(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);

  // Message state
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Password validation requirements
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  // Check password requirements
  const checkPasswordRequirements = (password: string) => {
    const requirements = {
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setValidations(requirements);

    return Object.values(requirements).every(Boolean);
  };

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmail(validateEmail(newEmail));
  };

  // Handle password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const isValid = checkPasswordRequirements(newPassword);
    setValidPassword(isValid);
    setPasswordsMatch(
      newPassword === confirmedPassword &&
        newPassword !== "" &&
        confirmedPassword !== ""
    );
  };

  // Handle confirm password input change
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmedPassword = e.target.value;
    setConfirmedPassword(newConfirmedPassword);
    setValidConfirmedPassword(checkPasswordRequirements(newConfirmedPassword));
    setPasswordsMatch(password === newConfirmedPassword);
  };

  // Handle form submission
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "http://localhost:5173/auth/email-confirmation",
      },
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }
    setSuccessMessage(
      "Sign up successful! Check your email for a confirmation link."
    );
    (document.getElementById("email") as HTMLInputElement).value = "";
    (document.getElementById("password") as HTMLInputElement).value = "";
    (document.getElementById("confirmedPassword") as HTMLInputElement).value =
      "";
  };

  return (
    <form onSubmit={handleSignUpSubmit}>
      <div className="flex w-min text-nowrap mx-auto items-baseline gap-2 mt-20">
        <h1 className="font-semibold">{brand}</h1>
        <p className="font-semibold">File Store</p>
      </div>
      <div className="flex flex-col mt-10 mx-auto items-center gap-4 p-8 rounded-sm bg-neutral-200 w-74">
        <h4 className="font-semibold text-center">Sign Up</h4>
        <div className="text-sm mx-6">
          <p>Create your account with email and password</p>
        </div>

        {/* Email input */}
        <input
          onChange={handleEmailChange}
          id="email"
          type="email"
          placeholder="Email"
          required
          className="border-neutral-400 border-b focus:outline-none focus:border-black"
        />

        {/* Password requirements */}
        <div className="text-xs mx-6">
          <p className="font-semibold mb-1">Password requirements:</p>
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
          {errorMessage && (
            <div>
              <br />
              <p className="text-red-500">{errorMessage}</p>
            </div>
          )}
          {successMessage && (
            <div>
              <br />
              <p className="text-green-600 font-bold">{successMessage}</p>
            </div>
          )}
        </div>

        {/* Password inputs */}
        <input
          onChange={handlePasswordChange}
          id="password"
          type="password"
          placeholder="Create Password"
          required
          className="border-neutral-400 border-b focus:outline-none focus:border-black"
        />
        <input
          onChange={handleConfirmPasswordChange}
          id="confirmedPassword"
          type="password"
          placeholder="Confirm Password"
          required
          className="border-neutral-400 border-b focus:outline-none focus:border-black"
        />

        {/* Sign in link */}
        <div className="flex justify-between w-46">
          <Link
            to="/auth/signin"
            className="text-neutral-500 text-xs underline mx-auto"
          >
            Already have an account? Sign In
          </Link>
        </div>

        {/* Submit button */}
        <input
          disabled={
            !(
              isEmail &&
              validPassword &&
              validConfirmedPassword &&
              passwordsMatch
            )
          }
          type="submit"
          value="Sign Up"
          className="bg-black cursor-pointer text-white p-2 rounded px-10 disabled:contrast-50 mt-2"
        />
      </div>
    </form>
  );
};

export default SignUpForm;
