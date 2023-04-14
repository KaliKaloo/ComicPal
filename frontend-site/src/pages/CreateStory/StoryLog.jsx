import { useState } from "react";
import openaiLogo from "../../assets/openai-logo.svg";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import autosize from "autosize/dist/autosize.js";
import { Link } from "react-router-dom";

function StoryLog() {
	const [input, setInput] = useState("");
	const [storyLog, setStoryLog] = useState([
		{
			user: "openai",
			message: `Lets make a story together. Start by asking me a question about the story you want to make :)`,
		},
	]);
	const [isLoading, setIsLoading] = useState(false);

	function clearStory() {
		setStoryLog([]);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		let newStoryLog = [...storyLog, { user: "me", message: `${input}` }];
		newStoryLog = [...newStoryLog, { user: "openai", message: `...` }];
		setInput("");
		setStoryLog(newStoryLog);

		const messages = newStoryLog.map((message) => message.message).join("");

		const response = await fetch(
			process.env.NODE_ENV === "production"
				? "https://comicpal.vercel.app/story"
				: "http://localhost:3080/story",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message: messages,
				}),
			}
		);
		const data = await response.json();
		newStoryLog.pop();
		setStoryLog([
			...newStoryLog,
			{ user: "openai", message: `${data.message}` },
		]);
	}

	// standalone script to automatically adjust textarea height
	autosize(document.querySelectorAll("textarea"));
	return (
		<div className="overflow-y-auto h-full relative text-black flex flex-col justify-between bg-dimYellow">
			<div className=" text-left mb-[100px]">
				{storyLog.map((message, index) => (
					<StoryMessage
						isLoading={isLoading}
						key={index}
						message={message}
					/>
				))}
			</div>
			<div className="p-[24px] w-full flex flex-col justify-center bg-dimYellow ">
				<button
					className="flex justify-end p-2 font-poppins text-md text-black text-opacity-50 hover:text-secondary"
					onClick={() =>
						setStoryLog([
							{
								user: "openai",
								message: `Lets make a story together. Start by asking me a question about the story you want to make :)`,
							},
						])
					}
				>
					clear
				</button>
				<div className="flex justify-between bg-[#f3f2f0] border rounded-md  shadow-md p-3 gap-2 w-full mb-4">
					<textarea
						id="textarea"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className=" bg-transparent outline-none w-full text-base resize-none h-10 break-words p-2.5 "
					></textarea>
					<ArrowRightCircleIcon
						className=" text-lightGreen hover:cursor-pointer h-10 hover:bg-black hover:bg-opacity-10 rounded-md"
						onClick={handleSubmit}
					>
						click
					</ArrowRightCircleIcon>
				</div>
				<p className="text-xs text-black text-opacity-50">
					Do you have thoughts about ComicPal? We'd love to hear them!
					Fill in the{" "}
					<span className="text-secondary text-xs">
						{" "}
						<Link to="/FeedbackForm" target="_blank">
							Feedback Form
						</Link>
					</span>{" "}
					Your feedback will help us improve.
				</p>
			</div>
		</div>
	);
}
const StoryMessage = ({ message }) => {
	return (
		<div className={`${message.user === "openai" && "bg-[#eae7d9]"}`}>
			<div className="w-full">
				<div className="flex mx-auto py-3 px-6 ">
					<div
						className={` rounded-full min-w-[48px] h-[48px] flex items-center justify-center ${
							message.user === "openai"
								? "bg-[#0da37f]"
								: "bg-white"
						}`}
					>
						{/* display svg */}
						{message.user === "openai" && (
							<img
								src={openaiLogo}
								alt="openai avatar"
								width={30}
								height={30}
							/>
						)}
					</div>
					<div className="px-10 text-base">{message.message}</div>
				</div>
			</div>
		</div>
	);
};

export default StoryLog;
