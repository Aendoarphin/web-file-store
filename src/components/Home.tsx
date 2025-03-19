import { useState } from "react";
import { searchFile } from "../utils/storage";
import ResultItem from "./ResultItem";
import StartupMessage from "./StartupMessage";

// Return elements that match the user's query
const findMatches = (sourceArr: string[], userInput: string) => {
  const pattern = new RegExp(userInput.trim(), "i");
  return userInput.length >= 2
    ? sourceArr.filter((source) => pattern.test(source))
    : [];
};

// Main page where user searches
const Home = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState<string[]>();

  const handleSubmit = async () => {
    if (input) {
      const response = await searchFile();
      const filtered = findMatches(response, input);
      setData(filtered);
      if (filtered.length === 0) {
        setData(["No results found"]);
      }
    }
  };

  return (
    <>
      <div className="flex-row gap-4 flex justify-between items-center px-6 py-2 w-full">
        <div id="logo">
          <h1 className="font-extrabold">SOPY</h1>
        </div>
        <div id="searchBarContainer" className="flex flex-row">
          <input
            id="searchBar"
            onClick={(e) => {
              e.currentTarget.value = "";
            }}
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            className={`bg-neutral-300 outline-0 focus:border-[1px] ${
              input.length > 0 ? "rounded-l-lg" : "rounded-lg"
            } p-2 text-sm`}
            placeholder="How to fund a loan..."
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />

          {input && (
            <button
              id="submitButton"
              className={`bg-neutral-900 active:scale-95 text-white outline-0 px-4 ${
                input.length > 0 ? "rounded-r-lg" : "rounded-lg"
              }`}
              onClick={() => handleSubmit()}
            >
              Submit
            </button>
          )}
        </div>
      </div>
      <hr className="mx-6 text-neutral-400" />
      <div
        id="resultsContainer"
        className="flex flex-col items-start p-6 w-full h-[90dvh]"
      >
        {data?.map((item, index) => (
          <ResultItem key={index} fileName={item} input={input} />
        ))}
				{data === undefined ? <StartupMessage />: null}
      </div>
    </>
  );
};

export default Home;
