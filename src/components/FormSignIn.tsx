import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { validateEmail } from "../scripts/helper";
import supabase from "../utils/supabase";

const FormConfirmPassword = () => {
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [isEmail, setIsEmail] = useState<boolean>(false);

  const signInUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userInput.email,
      password: userInput.password,
    });
    if (data.user?.email === userInput.email) {
      navigate("/");
    }
    console.log(data);
    if (error) {
      console.log(error.message);
    }
    setUserInput({ email: "", password: "" });
  };

  return (
    <>
      <form onSubmit={signInUser}>
        <div className="flex w-min text-nowrap mx-auto items-baseline gap-2 mt-20">
          <h1 className="font-semibold">S O P Y</h1>
          <p className="font-semibold">File Store</p>
        </div>
        <div className="flex flex-col mt-20 mx-auto items-center gap-4 p-8 rounded-md bg-neutral-200 w-74">
          <h3 className="font-semibold">Sign In</h3>
          <input
            type="email"
            required
            placeholder="Email"
            value={userInput.email}
            onChange={(e) => {
              setUserInput({ ...userInput, email: e.target.value });
              setIsEmail(validateEmail(e.target.value));
            }}
            className="border-neutral-400 border-b focus:outline-none focus:border-black"
          />
          <input
            enterKeyHint="enter"
            type="password"
            placeholder="Password"
            value={userInput.password}
            onChange={(e) => {
              setUserInput({ ...userInput, password: e.target.value });
            }}
            className="border-neutral-400 border-b focus:outline-none focus:border-black"
          />
          <div className="flex flex-col justify-between w-46">
            <Link
              to="/auth/reset"
              className="text-neutral-500 text-xs underline mx-auto"
            >
              Forgot Password
            </Link>
            <Link
              to="/auth/signup"
              className="text-neutral-500 text-xs underline mx-auto"
            >
              Create Account
            </Link>
          </div>
          <input
            disabled={!isEmail}
            type="submit"
            value="Sign In"
            className="bg-black text-white p-2 rounded px-10 disabled:contrast-50 cursor-pointer"
          />
        </div>
      </form>
    </>
  );
};

export default FormConfirmPassword;
