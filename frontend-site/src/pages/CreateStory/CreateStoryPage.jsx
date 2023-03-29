import { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import Notepad from "./Notepad";
import StoryLog from "./StoryLog";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";
import "react-reflex/styles.css";
import Details from "./Details";

function CreateStoryPage() {
	const [description, setDescription] = useState("");
	const [splitDirection, setSplitDirection] = useState(
		window.innerWidth > 760 ? "vertical" : "horizontal"
	);

	useEffect(() => {
		const handleWindowResize = () => {
			if (window.innerWidth > 760) {
				setSplitDirection("vertical");
			} else {
				setSplitDirection("horizontal");
			}
			// setWindowWidth(window.innerWidth);
		};
		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	});

	return (
		<MainLayout footer="noFooter">
			<div className="h-[calc(100vh-3.5rem)]">
				<ReflexContainer
					orientation={
						splitDirection === "vertical"
							? "vertical"
							: "horizontal"
					}
				>
					<ReflexElement propagateDimensions={true}>
						<div className=" bg-dimYellow h-full">
							<StoryLog />
						</div>
					</ReflexElement>

					<ReflexSplitter
						style={
							splitDirection === "vertical"
								? { width: "8px" }
								: { height: "8px" }
						}
					/>

					<ReflexElement
						className="right-pane"
						minSize="10"
						maxSize="900"
					>
						<div className="bg-white h-full flex">
							<Notepad setDescription={setDescription} />
							{/* <Details description={description} /> */}
						</div>
					</ReflexElement>
				</ReflexContainer>
			</div>
		</MainLayout>
	);
}

export default CreateStoryPage;
