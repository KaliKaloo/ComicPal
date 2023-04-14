import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import playgroundStory from "../../assets/playgroundStory.png";

function StoryOptions() {
	return (
		<MainLayout>
			<div className="w-full py-[6rem] px-4 flex justify-center items-center ">
				<div
					className={`max-w-[1240px] mx-auto flex md:flex-row flex-col  md:px-4 px-14 gap-8 font-poppins`}
				>
					<Link to="/CreateStory">
						<div className="w-96  bg-paleYellow shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 hover:text-secondary mx-auto">
							<img
								src={playgroundStory}
								className="mt-8 h-64 w-[200px] mx-auto border-solid border-2 border-darkGreen"
							/>
							<h2 className="text-xl font-bold text-center p-6">
								Chat with AI
							</h2>
							<p className="text-center text-black text-opacity-50">
								Collaborate with an AI to create a story. You
								can brainstorm plot points together, ask it
								questions and expand on any ideas you have!
							</p>
						</div>
					</Link>

					<Link to="/CreateStoryTimeline">
						<div className="w-96 bg-paleYellow shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 hover:text-secondary mx-auto">
							<img
								src={playgroundStory}
								className="mt-8 h-64 w-[200px] mx-auto border-solid border-2 border-darkGreen"
							/>
							<h2 className="text-xl font-bold text-center p-6">
								Create a story timeline
							</h2>
							<p className="w-full text-center text-black text-opacity-50">
								Place and drag n' drop text boxes on a story
								timeline! You have full control over the
								narrative but the AI is still there whenever you
								need the extra help.
							</p>
						</div>
					</Link>
				</div>
			</div>
		</MainLayout>
	);
}

export default StoryOptions;
