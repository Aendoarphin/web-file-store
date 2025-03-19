import { getDownloadLink } from "../utils/storage";
import { useState, useEffect } from "react";

const highlightMatches = (input: string, targetString: string) => {
  if (!input) return targetString;
  
  const regex = new RegExp(`(${input})`, "gi");
  return targetString.split(regex).map((part, index) => 
    part.toLowerCase() === input.toLowerCase() ? <b className="bg-yellow-300" key={index}>{part}</b> : part
  );
};

const ResultItem = (props: {fileName: string, input: string}) => {
  const [downloadLink, setDownloadLink] = useState('');

  useEffect(() => {
    const fetchLink = async () => {
      const response = await getDownloadLink(props.fileName);
      setDownloadLink(response);
    }

    fetchLink();
  }, [props.fileName]);

  return (
    <>
      {props.fileName === "No results found" ? (
        <p>No results found</p>
      ) : (
        <div className="w-full bg-neutral-200 first-of-type:rounded-t-md last-of-type:rounded-b-md p-4 odd:bg-neutral-300 not-last-of-type:border-b-[1px] not-last-of-type:border-b-neutral-400">
          <a href={downloadLink} className="hover:underline">{highlightMatches(props.input, props.fileName)}</a>
        </div>
      )}
    </>
  );
};

export default ResultItem;