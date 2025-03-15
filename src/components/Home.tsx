import { useState } from "react";
import { createSearchParams, Link } from "react-router";

const Home = () => {
	const [ready, setReady] = useState(false);
	const [input, setInput] = useState("");

	return (
		<>
			<div className="flex-col gap-4 flex justify-center items-center h-[100vh] w-min mx-auto">
				<div className="flex flex-row justify-between place-items-baseline gap-2 w-full">
					<h1 className="font-bold text-3xl">SOPY</h1>
				</div>
				<div className="flex flex-row">
					<input
						type="text"
						className={`bg-neutral-300 focus:outline-0 contrast-125 focus:contrast-100 border-none ${
							ready ? "rounded-l-lg" : "rounded-lg"
						} p-2 text-sm min-w-96`}
						placeholder="How to fund a loan..."
						onChange={(e) => {
							if (e.target.value.length > 0) {
								setReady(true);
							} else {
								setReady(false);
							}
							setInput(e.target.value);
						}}
					/>
					{ready && (
						<Link
							to={{
								pathname: "results",
								search: `${createSearchParams({ q: input })}`,
							}}
							className="outline-0 focus:border-[1px] focus:rounded-r-xl"
						>
							<button
								className={`bg-neutral-600 active:scale-95 text-white outline-0 font-bold py-2 px-4 ${
									ready ? "rounded-r-lg" : "rounded-lg"
								}`}
							>
								Submit
							</button>
						</Link>
					)}
				</div>
				{input}
			</div>
		</>
	);
};

export default Home;
