import { useState } from "react";
import { searchFile } from "../utils/storage";
import ResultItem from "./ResultItem";

// Main page where user searches
const Home = () => {
	const [input, setInput] = useState("");
	const [data, setData] = useState<string[]>();

	const handleSubmit = async () => {
		if (input) {
			const response = await searchFile(input);
			setData(response);
		}
	}

	return (
		<>
			<div className="flex-row gap-4 flex items-center p-6 w-full">
				<div className="flex flex-row justify-between place-items-baseline gap-2 w-full">
					<h1>SOPY</h1>
				</div>
				<div className="flex flex-row">
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
						} p-2 text-sm min-w-96`}
						placeholder="How to fund a loan..."
						onChange={(e) => {
							setInput(e.target.value);
						}}
					/>
					{input && (
						<button
							className={`bg-neutral-600 active:scale-95 text-white outline-0 font-bold py-2 px-4 ${
								input.length > 0 ? "rounded-r-lg" : "rounded-lg"
							}`}
							onClick={() => handleSubmit()}
						>
							Submit
						</button>
					)}
				</div>
			</div>
			<div className="flex flex-col items-start p-6 w-full">
				{data?.map((item) => (
					<ResultItem fileName={item} />
				))}
			</div>
		</>
	);
};

export default Home;
