import { useState } from "react";
import openaiLogo from "../../assets/openai-logo.svg";
import FeedbackCard from "../../components/ui/FeedbackCard";
import MainLayout from "../../layout/MainLayout";
import "./CreateStoryPage.css";

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

		const response = await fetch(process.env.NODE_ENV === "production" ? "https://comicpal.vercel.app/story" :"http://localhost:3080/story", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				message: messages,
			}),
		});
		const data = await response.json();
		newStoryLog.pop();
		setStoryLog([
			...newStoryLog,
			{ user: "openai", message: `${data.message}` },
		]);
	}

	return (
		<MainLayout footer="noFooter">
			<div className="createStoryPageLayout">
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
			</div>
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
