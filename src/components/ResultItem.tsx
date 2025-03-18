interface ResultItemProps {
  fileName: string;
}

const ResultItem = ({ fileName }: ResultItemProps) => {
  return (
    <div className="w-full bg-neutral-200 cursor-pointer first-of-type:rounded-t-md last-of-type:rounded-b-md p-4 odd:bg-neutral-300 not-last-of-type:border-b-[1px] not-last-of-type:border-b-neutral-400">
      {fileName}
    </div>
  )
}

export default ResultItem
