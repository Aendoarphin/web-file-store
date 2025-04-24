import {
  IconFile,
  IconFileTypeJpg,
  IconFileTypePdf,
  IconFileTypePng,
  IconFileTypeTxt,
  IconFileTypeXls,
  IconFileWord,
} from "@tabler/icons-react";
import { getFileDownloadLink } from "../utils/actions";
import { useState, useEffect } from "react";
import { IconMap } from "../types/types";

const ResultItem = (props: { fileName: string; input: string }) => {
  const [downloadLink, setDownloadLink] = useState("");
  const [currentFileIcon, setCurrentFileIcon] =
    useState<React.ReactNode | null>();

  const IconMap: IconMap = {
    pdf: <IconFileTypePdf className="inline" color="red" />,
    docx: <IconFileWord className="inline" color="#085991" />,
    doc: <IconFileWord className="inline" color="#085991" />,
    txt: <IconFileTypeTxt className="inline" />,
    png: <IconFileTypePng className="inline" />,
    jpg: <IconFileTypeJpg className="inline" />,
    jpeg: <IconFileTypeJpg className="inline" />,
    xlsx: <IconFileTypeXls className="inline" color="green" />,
    xls: <IconFileTypeXls className="inline" color="green" />,
  };

  const highlightMatches = (input: string, targetString: string) => {
    if (!input) return targetString;

    const regex = new RegExp(`(${input})`, "gi");
    return targetString.split(regex).map((part, index) =>
      part.toLowerCase() === input.toLowerCase() ? (
        <b className="bg-yellow-300" key={index}>
          {part}
        </b>
      ) : (
        part
      )
    );
  };

  const fetchLink = async () => {
    const response = await getFileDownloadLink(props.fileName);
    setDownloadLink(response);
  };

  const fetchIcons = () => {
    const fileExt = props.fileName.split(".").pop()?.toLowerCase();
    setCurrentFileIcon(fileExt ? IconMap[fileExt] : null);
  };

  useEffect(() => {
    fetchIcons();
    fetchLink();
  }, [props.fileName]);

  return (
    <>
      {props.fileName === "No results found" ? (
        <p>No results found</p>
      ) : (
        <div className="group w-full bg-neutral-200 items-center flex gap-4 first-of-type:rounded-t-md last-of-type:rounded-b-md p-4 odd:bg-neutral-300 not-last-of-type:border-b-[1px] not-last-of-type:border-b-neutral-400">
          {currentFileIcon ? currentFileIcon : <IconFile />}
          <a href={downloadLink} className=" group-hover:underline">
            {highlightMatches(props.input, props.fileName)}
          </a>
        </div>
      )}
    </>
  );
};

export default ResultItem;
