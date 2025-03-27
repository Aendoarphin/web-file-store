import { Link } from "react-router";
import { useState } from "react";

const SignIn = () => {
  const [password, setPassword] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [userInput, setUserInput] = useState<{email: string | undefined, password: string | undefined}>({email: "", password: ""});

  return (
    <>
    <div className="flex w-min text-nowrap mx-auto items-baseline gap-2 mt-20">
            <h3 className="font-semibold">S O P Y</h3>
            <p className="font-semibold">File Store</p>
          </div>
      <div className="flex flex-col mt-20 mx-auto items-center gap-4 p-8 rounded-md bg-neutral-100 w-74">
        <h3 className="font-semibold">Sign In</h3>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border-neutral-400 border-b focus:outline-none focus:border-black"
        />
        <input
        enterKeyHint="enter"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="border-neutral-400 border-b focus:outline-none focus:border-black"
        />
        <div className="flex justify-between w-46">
        <Link to="/reset" className="text-neutral-500 text-xs underline mx-auto">Forgot Password</Link>
        </div>
        <input
          onClick={() => {
            setUserInput({email, password})
            alert(userInput.email + " " + userInput.password)
          }}
          type="submit"
          value="Sign In"
          className="bg-black text-white p-2 rounded px-10"
        />
      </div>
    </>
  );
};

// continue here; validate records with form data

export default SignIn;
