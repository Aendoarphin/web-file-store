interface ResultItemProps {
  fileName: string;
  input: string;
}

const highlightMatches = (input: string, targetString: string) => {
  if (!input) return targetString;
  
  const regex = new RegExp(`(${input})`, "gi");
  return targetString.split(regex).map((part, index) => 
    part.toLowerCase() === input.toLowerCase() ? <b className="bg-yellow-300" key={index}>{part}</b> : part
  );
};

const ResultItem = ({ fileName, input }: ResultItemProps) => {
  return (
    <>
      {fileName === "No results found" ? (
        <p>No results found</p>
      ) : (
        <div className="w-full bg-neutral-200 cursor-pointer first-of-type:rounded-t-md last-of-type:rounded-b-md p-4 odd:bg-neutral-300 not-last-of-type:border-b-[1px] not-last-of-type:border-b-neutral-400">
          {highlightMatches(input, fileName)}
        </div>
      )}
    </>
  );
};

export default ResultItem;