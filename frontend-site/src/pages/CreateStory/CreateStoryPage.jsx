import { useState } from "react";
import openaiLogo from "../../assets/openai-logo.svg";
import FeedbackCard from "../../components/ui/FeedbackCard";
import MainLayout from "../../layout/MainLayout";
import "./CreateStoryPage.css";
import {
	ChatBubbleOvalLeftIcon,
	PresentationChartLineIcon,
} from "@heroicons/react/24/outline";

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

	return (
		<MainLayout footer="noFooter">
			{/* <aside
				className="fixed left-0 z-40 w-44 h-full transition-transform -translate-x-full sm:translate-x-0 font-poppins"
				aria-label="Sidebar"
			>
				<div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 justify-between flex flex-col">
					<ul class="space-y-2">
						<li>
							<a
								href="#"
								class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<ChatBubbleOvalLeftIcon class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
								<span class="ml-3">Chatbot</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<PresentationChartLineIcon class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
								<span class="flex-1 ml-3 whitespace-nowrap">
									Timeline
								</span>
							</a>
						</li>
					</ul>
					<div className="scale-75 mb-10">
						<FeedbackCard />
					</div>
				</div>
			</aside> */}
			<div className="h-screen w-full overflow-hidden fixed bg-primaryGreen">
				<div className="h-[92vh] p-4 flex max-h-screen overflow-y-auto">
					<section className="storyBox ">
						<div className="story-log">
							{storyLog.map((message, index) => (
								<StoryMessage
									isLoading={isLoading}
									key={index}
									message={message}
								/>
							))}
						</div>
						<div className="story-input-holder">
							<form onSubmit={handleSubmit}>
								<input
									rows="1"
									value={input}
									onChange={(e) => setInput(e.target.value)}
									className="story-input-textarea"
								></input>
							</form>
						</div>
					</section>
				</div>
			</div>

			{/* <div className="createStoryPageLayout">
				<aside className="sideMenu">
					<div className="side-menu-button" onClick={clearStory}>
						<span>+</span>
						Clear Chat
					</div>
					<div className="scale-75 mb-[-1rem] ml-[-1rem]">
						<FeedbackCard />
					</div>
				</aside>

				<section className="storyBox">
					<div className="story-log">
						{storyLog.map((message, index) => (
							<StoryMessage
								isLoading={isLoading}
								key={index}
								message={message}
							/>
						))}
					</div>
					<div className="story-input-holder">
						<form onSubmit={handleSubmit}>
							<input
								rows="1"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								className="story-input-textarea"
							></input>
						</form>
					</div>
				</section>
			</div> */}
		</MainLayout>
	);
}

const StoryMessage = ({ message }) => {
	return (
		<div
			className={`story-message ${message.user === "openai" && "openai"}`}
		>
			<div className="story-message-center">
				<div
					className={`avatar ${
						message.user === "openai" && "openai"
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
				<div className="message">{message.message}</div>
			</div>
		</div>
	);
};

export default CreateStoryPage;
