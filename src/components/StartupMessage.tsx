import { IconArrowUp } from "@tabler/icons-react"

function StartupMessage() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col items-center justify-center h-full text-neutral-400">
        <h3 className="text-2xl">Search for documents at the top right <IconArrowUp className="inline rotate-45"/></h3>
      </div>
    </div>
  )
}

export default StartupMessage