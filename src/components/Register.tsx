const Register = () => {
  return (
    <>
      <div className="flex flex-col mt-40 mx-auto items-center gap-4 p-8 shadow rounded-md bg-neutral-100 w-74">
        <h2 className="font-semibold">Register</h2>
        <input
          type="email"
          placeholder="Email"
          className="border-neutral-400 border-b focus:outline-none focus:border-black"
        />
        <input
          type="password"
          placeholder="Password"
          className="border-neutral-400 border-b focus:outline-none focus:border-black"
        />
        <a href="/login" className="text-neutral-500 text-xs underline">Or Log Into Existing Account</a>
        <input
          type="submit"
          value="Register"
          className="bg-black text-white p-2 rounded px-10 mt-4"
        />
      </div>
    </>
  );
};

export default Register;
