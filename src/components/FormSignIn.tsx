import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { validateEmail } from "../scripts/validateEmail";
import supabase from "../utils/supabase";

const FormSignIn = () => {
  const navigate = useNavigate();

  const supabaseSignInUser = async (
    email: string,
    password: string
  ): Promise<object | any> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (data.user?.email === email) {
      navigate("/");
    }
    if (error) {
      alert(error.message);
    }
  };
// continue here; fetch user from supabase auth
  const [userInput, setUserInput] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [isEmail, setIsEmail] = useState<boolean>(false);

  return (
    <>
      <form
        onSubmit={() => {
          alert(`Email: ${userInput.email} Password: ${userInput.password}`);
          supabaseSignInUser(userInput.email, userInput.password);
        }}
      >
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
          <div className="flex justify-between w-46">
            <Link
              to="/reset"
              className="text-neutral-500 text-xs underline mx-auto"
            >
              Forgot Password
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

export default FormSignIn;
