const Login = () => {
  return (
    <>
      <div className="flex flex-col mt-40 mx-auto items-center gap-4 p-8 shadow rounded-md bg-neutral-100 w-74">
        <h2 className="font-semibold">Log In</h2>
        <input
          type="username"
          placeholder="Username"
          className="border-neutral-400 border-b focus:outline-none focus:border-black"
        />
        <input
          type="password"
          placeholder="Password"
          className="border-neutral-400 border-b focus:outline-none focus:border-black"
        />
        <div className="flex justify-between w-46">
        <a href="/register" className="text-neutral-500 text-xs underline">Register</a>
        <a href="#" className="text-neutral-500 text-xs underline">Forgot Password</a>

        </div>
        <input
          type="submit"
          value="Log In"
          className="bg-black text-white p-2 rounded px-10 mt-4"
        />
      </div>
    </>
  );
};

export default Login;
