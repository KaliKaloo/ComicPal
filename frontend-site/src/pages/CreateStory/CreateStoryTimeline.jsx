import { useRef, useState } from "react";
import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { RiTBoxLine, RiAddCircleLine, RiCloseFill } from "react-icons/ri";
import "./NotepadStyle.css";
import { Draggable } from "../../components/ui/Draggable";
import { Droppable } from "../../components/ui/Droppable";
import MainLayout from "../../layout/MainLayout";
import TextBox from "./TextBox";
import Timeline from "./Timeline";
import Tooltip from "../../components/ui/Tooltip";
import styles from "../../assets/style";
import StoryLog from "./StoryLog";
import openaiLogo from "../../assets/openai-logo.svg";

function CreateStoryTimeline() {
	const [objectList, setObjectList] = useState([]);
	const [count, setCount] = useState(1);
	const [timelineCount, setTimelineCount] = useState(4);
	const [timelineList, setTimelineList] = useState([
		{
			id: 1,
		},
		{
			id: 2,
		},
		{
			id: 3,
		},
	]);
	const [aiChat, setAiChat] = useState(false);

	const addObject = () => {
		setObjectList([
			...objectList,
			{
				id: count,
				position: { x: 100, y: 100 },
				focus: "",
			},
		]);
		setCount(count + 1);
	};
	const deleteObject = (id) => {
		setObjectList(objectList.filter((panel) => panel.id !== id));
	};

	const addTimeline = () => {
		setTimelineList([
			...timelineList,
			{
				id: timelineCount,
			},
		]);
		setTimelineCount(timelineCount + 1);
	};

	const deleteTimelinePoint = (id) => {
		setTimelineList(timelineList.filter((point) => point.id !== id));
	};

	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				delay: 200,
				tolerance: 8,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 200,
				tolerance: 8,
			},
		})
	);

	function handleDragStart(ev) {
		const object = objectList.find((x) => x.id === ev.active.id);
		object.focus = "onFocus";
		const _newList = objectList.map((x) => {
			if (x.id === object.id) return object;
			return x;
		});
		setObjectList(_newList);
	}

	function handleDragEnd(ev) {
		const object = objectList.find((x) => x.id === ev.active.id);
		object.position.x += ev.delta.x;
		object.position.y += ev.delta.y;
		object.focus = "";
		const _newList = objectList.map((x) => {
			if (x.id === object.id) return object;
			return x;
		});
		setObjectList(_newList);
	}

	return (
		<MainLayout footer="noFooter">
			<div className="bg-dimYellow h-[calc(100vh-3.5rem)] overflow-auto w-full">
				<DndContext
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
					sensors={sensors}
				>
					<div
						className={`z-20 flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg  fixed top-2/4 -translate-y-2/4 left-3 min-h-[auto] lg:min-w-[64px] min-w-[40px] flex-col rounded-lg border`}
					>
						<Tooltip text="Textbox">
							<RiTBoxLine
								onClick={() => addObject()}
								className="aspect-square lg:h-12 h-10 lg:w-16 w-12 flex-col items-center justify-center rounded-md  text-gray-700 hover:bg-gray-200 duration-200"
							/>
						</Tooltip>
					</div>

					<Droppable>
						<div className="relative">
							<div className="mt-4 mb-14">
								<h2
									className={`${styles.heading2} w-full text-center pb-4 text-primaryGreen text-opacity-60`}
								>
									Timeline
								</h2>
								{timelineList.map((obj) => (
									<Timeline
										deleteTimelinePoint={() =>
											deleteTimelinePoint(obj.id)
										}
									/>
								))}
								<div className="w-full flex flex-col justify-center items-center">
									<Tooltip text="Add point to timeline">
										<RiAddCircleLine
											onClick={() => addTimeline()}
											className="h-8 w-8 hover:text-secondary duration-200"
										/>
									</Tooltip>
									{timelineCount <= 4 && (
										<p className="text-xs italic text-gray-400 my-4">
											Click on the plus button to add more
											points to the timeline
										</p>
									)}
								</div>
							</div>

							{objectList.map((obj) => (
								<Draggable
									styles={{
										position: "absolute",
										left: `${obj.position.x}px`,
										top: `${obj.position.y}px`,
									}}
									id={obj.id}
									key={obj.id}
								>
									<TextBox
										deleteFunc={() => deleteObject(obj.id)}
										focus={obj.focus}
									/>
								</Draggable>
							))}
						</div>
					</Droppable>
				</DndContext>
				<div
					className={` ${
						aiChat ? "scale-100" : "scale-0"
					} z-20 flex shrink-0 grow-0 justify-around gap-2 fixed bottom-0 right-3 `}
				>
					<div
						className={`border-1 border-gray-300 shadow-lg shadow-gray-400 h-[90%] md:h-[35rem] w-[95%] md:w-[35rem] flex-col rounded-md border overflow-hidden`}
					>
						<div className="h-10 w-full bg-lightGreen flex justify-between items-center p-2 border-b-4 border-[#007864]">
							<p className="pt-1 font-medium text-white text-opacity-70 font-poppins ml-3 text-lg ">
								AI ChatBot
							</p>
							<RiCloseFill
								onClick={() => setAiChat(!aiChat)}
								className="h-6 w-6 hover:bg-black hover:bg-opacity-20 text-white rounded-full"
							/>
						</div>
						<div className="h-full overflow-y-auto">
							<StoryLog />
						</div>
					</div>
				</div>
				{!aiChat && (
					<div className="group relative">
						<div className="font-poppins text-sm pointer-events-none fixed bottom-28 right-3 whitespace-nowrap rounded bg-gray-700 px-2 py-2 text-white opacity-0 transition  before:absolute before:left-[70%] before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-gray-700 before:content-[''] group-hover:opacity-100">
							Chat with the AI to get some help!
						</div>
						<div
							onClick={() => setAiChat(true)}
							className="z-20 fixed bottom-3 md:bottom-8 right-3 md:right-10 h-16 w-16 rounded-full  bg-lightGreen  text-white cursor-pointer hover:bg-primaryGreen  duration-200 flex justify-center items-center text-center shadow-lg"
						>
							<img
								src={openaiLogo}
								alt="openai avatar"
								width={50}
								height={50}
							/>
						</div>
					</div>
				)}
			</div>
		</MainLayout>
	);
}

export default CreateStoryTimeline;
