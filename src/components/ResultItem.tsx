interface ResultItemProps {
  fileName: string;
}

const ResultItem = ({ fileName }: ResultItemProps) => {
  return (
    <div className="w-full bg-neutral-200 cursor-pointer first-of-type:rounded-b-none first-of-type:rounded-t-md p-4 odd:bg-neutral-300 odd:border-b-2 odd:border-b-neutral-400">
      {fileName}
    </div>
  )
}

export default ResultItem
