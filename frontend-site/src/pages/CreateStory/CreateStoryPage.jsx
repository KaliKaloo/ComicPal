import { useState } from "react";
import openaiLogo from "../../assets/openai-logo.svg";
import MainLayout from "../../layout/MainLayout";
import Notepad from "./Notepad";
import {
	ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import autosize from "autosize/dist/autosize.js";
import { Link } from "react-router-dom";

function CreateStoryPage() {
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
		<MainLayout footer="noFooter">
			<div className="h-screen w-full overflow-hidden fixed bg-primaryGreen grid grid-rows-2 md:grid-cols-2 font-poppins">
				<section className="h-full md:h-[94vh] w-full overflow-y-auto bg-dimYellow relative text-black flex flex-col justify-between">
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
						<div className="flex justify-between bg-[#f3f2f0] border rounded-md  shadow-md p-3 gap-2 w-full mb-4">
							<textarea
							id="textarea"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								className=" bg-transparent outline-none w-full text-base resize-none h-10 text-center break-words p-2.5 "
							></textarea>
							<ArrowRightCircleIcon className=" text-lightGreen hover:cursor-pointer h-10 hover:bg-black hover:bg-opacity-10 rounded-md" onClick={handleSubmit}>click</ArrowRightCircleIcon>
							
						</div>
					<p className="text-xs text-black text-opacity-50">Do you have thoughts about ComicPal?  We'd love to hear them! Fill in the <span className="text-secondary text-xs" > <Link to="/FeedbackForm" target="_blank">Feedback Form</Link></span> Your feedback will help us improve.
					</p> 

					</div>
				</section>
				<section className="bg-white h-full md:h-[94vh]">
					<Notepad/>
				</section>
			</div>
		</MainLayout>
	);
}

const StoryMessage = ({ message }) => {
	return (
		<div className={`${message.user === "openai" && "bg-[#eae7d9]"}`}>
			<div className="w-[80%]">
				<div className="flex mx-auto py-3 px-6 ">
					<div
						className={`bg-white rounded-full min-w-[48px] h-[48px] flex items-center justify-center ${
							message.user === "openai" && "bg-[#0da37f]"
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

export default CreateStoryPage;
