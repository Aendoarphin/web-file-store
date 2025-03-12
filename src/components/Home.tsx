import { useState } from "react";
import { IconInfoCircle } from "@tabler/icons-react";
import { Link } from "react-router";

const Home = () => {
  const [ready, setReady] = useState(false);

  return (
    <>
      <div className="flex-col gap-4 flex justify-center items-center h-[100vh]">
        <div className="flex flex-row justify-center place-items-baseline gap-2">
          <h1 className="font-bold text-3xl">Sopy</h1>
          <IconInfoCircle
            stroke={2}
            size={20}
            color="gray"
            title="Submit any relevant words or phrases into the search bar to get step-by-step instructions."
          />
        </div>
        <div className="flex flex-row">
          <input
            type="text"
            className={`bg-neutral-300 focus:outline-neutral-500 border-none ${
              ready ? "rounded-l-lg" : "rounded-lg"
            } p-2 text-sm min-w-96`}
            placeholder="How to fund a loan..."
            onChange={(e) => {
              if (e.target.value.length > 0) {
                setReady(true);
              } else {
                setReady(false);
              }
            }}
          />
          {ready && (
            <Link to="/search">
              <button
              className={`bg-neutral-600 active:scale-95 text-white font-bold py-2 px-4 ${
                ready ? "rounded-r-lg" : "rounded-lg"
              }`}
            >
              Submit
            </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
