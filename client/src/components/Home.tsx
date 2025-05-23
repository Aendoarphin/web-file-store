import { useState } from "react";
import { getFileNames } from "../utils/actions";
import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import ResultItem from "./ResultItem";
import StartupMessage from "./messages/StartupMessage";

// Main page to search documents
const Home = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState<string[]>();
  const [order, setOrder] = useState("asc");
  
  // Return elements that match the user's query
  const findMatches = (sourceArr: string[], userInput: string) => {
    const pattern = new RegExp(userInput.trim(), "i");
    return userInput.length >= 2
      ? sourceArr.filter((source) => pattern.test(source))
      : [];
  };

  const handleSubmit = async () => {
    try {
      if (input.trim()) {
        const response = await getFileNames();
        const filtered = findMatches(response, input);
        setData(filtered);
        if (filtered.length === 0) {
          setData(["No results found"]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-row h-[100vh]">
        <div className="w-full">
          {/* HEADER */}
          <div
            id="searchBarContainer"
            className="flex flex-row p-4 justify-end"
          >
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
                input.length > 0 ? "rounded-l-sm" : "rounded-sm"
              } p-2 text-sm`}
              placeholder="How to XYZ..."
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            {input && (
              <button
                id="submitButton"
                className={`bg-neutral-700 active:scale-95 text-white outline-0 px-4 ${
                  input.length > 0 ? "rounded-r-sm" : "rounded-sm"
                }`}
                onClick={() => handleSubmit()}
              >
                Search
              </button>
            )}
          </div>
          <hr className="mx-4 text-neutral-400" />
          {/* MAIN BODY */}
          <div className="w-full px-4 pt-4 flex justify-end">
            {data && (
              <button
                className=" text-xs hover:-translate-y-1"
                onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
              >
                {order === "asc" ? (
                  <div className="flex items-center">
                    <p>Ascending</p>
                    <IconArrowUp className="inline" size={15} />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <p>Descending</p>
                    <IconArrowDown className="inline" size={15} />
                  </div>
                )}
              </button>
            )}
          </div>
          <div
            id="resultsContainer"
            className={
              data
                ? "flex flex-wrap gap-2 p-4"
                : "flex flex-col items-start p-4 w-full h-[90dvh]"
            }
          >
            {order === "asc"
              ? data?.map((item, index) => (
                  <ResultItem key={index} fileName={item} input={input} />
                ))
              : data
                  ?.slice()
                  .reverse()
                  .map((item, index) => (
                    <ResultItem key={index} fileName={item} input={input} />
                  ))}
            {data === undefined ? <StartupMessage /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
