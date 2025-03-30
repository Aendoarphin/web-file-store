import { Link } from "react-router";
import { useState } from "react";
import { validateEmail } from "../scripts/helper";
import supabase from "../utils/supabase";

const FormSignUp = () => {
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password] = useState<string>("SupaBase#1");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");


  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: "http://localhost:5173/auth/confirm",
      }
    })
    if (error) {
      setErrorMessage(error.message);
      return;
    }
    setSuccessMessage(successMessage);
    alert("Email was sent to " + data.user?.email)
  };

  return (
    <>
      <form onSubmit={handleSignUpSubmit}>
        <div className="flex w-min text-nowrap mx-auto items-baseline gap-2 mt-20">
          <h1 className="font-semibold">S O P Y</h1>
          <p className="font-semibold">File Store</p>
        </div>
        <div className="flex flex-col mt-20 mx-auto items-center gap-4 p-8 rounded-md bg-neutral-200 w-74">
          <h4 className="font-semibold text-center">Sign Up</h4>
          <div className="text-sm mx-6">
            <p>Enter your email and we'll send you an invitation link</p>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
          </div>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmail(validateEmail(e.target.value));
            }}
            type="email"
            placeholder="Email"
            required
            className="border-neutral-400 border-b focus:outline-none focus:border-black"
          />
          <div className="flex justify-between w-46">
            <Link
              to="/auth"
              className="text-neutral-500 text-xs underline mx-auto"
            >
              Back to Sign In
            </Link>
          </div>
          <input
            disabled={!isEmail}
            type="submit"
            value="Sign Up"
            className="bg-black text-white p-2 rounded px-10 disabled:contrast-50"
          />
        </div>
      </form>
    </>
  );
};

export default FormSignUp;
