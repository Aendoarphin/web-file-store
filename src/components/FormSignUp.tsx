import { Link } from "react-router";
import { useState } from "react";
import { validateEmail } from "../scripts/helper";
import supabase from "../utils/supabase";

const FormSignUp = () => {
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  const handleSignUpSubmit = async (e: React.FormEvent) => {
    const { data:{user, session}, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })
    console.log(user, session, error)
  };
  // continue here. create users
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
            Enter your email and we'll send you an invitation link
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
