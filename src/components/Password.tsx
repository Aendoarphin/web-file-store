import { Link } from "react-router";

const Password = () => {
  return (
    <>
    <div className="flex w-min text-nowrap mx-auto items-baseline gap-2 mt-20">
            <h3 className="font-semibold">S O P Y</h3>
            <p className="font-semibold">File Store</p>
          </div>
      <div className="flex flex-col mt-20 mx-auto items-center gap-4 p-8 rounded-md bg-neutral-100 w-74">
        <h4 className="font-semibold text-center">Reset Password</h4>
        <div className="text-sm mx-6">Enter your email and we we'll send you a link to reset.</div>
        <input
          type="email"
          placeholder="Email"
          required
          className="border-neutral-400 border-b focus:outline-none focus:border-black"
        />
        <div className="flex justify-between w-46">
        <Link to="/signin" className="text-neutral-500 text-xs underline mx-auto">Back to Sign In</Link>
        </div>
        <input
          type="submit"
          value="Send Reset Link"
          className="bg-black text-white p-2 rounded px-10"
        />
      </div>
    </>
  );
};

export default Password;
