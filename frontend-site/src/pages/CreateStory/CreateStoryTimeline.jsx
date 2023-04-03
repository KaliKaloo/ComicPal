import { useRef, useState } from "react";
import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { RiTBoxLine, RiAddCircleLine } from "react-icons/ri";
import "./NotepadStyle.css";
import { Draggable } from "../../components/ui/Draggable";
import { Droppable } from "../../components/ui/Droppable";
import MainLayout from "../../layout/MainLayout";
import TextBox from "./TextBox";
import Timeline from "./Timeline";
import Tooltip from "../../components/ui/Tooltip";
import styles from "../../assets/style";

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
				delay: 150,
				tolerance: 8,
			},
		}),
		useSensor(TouchSensor, {
			activationConstraint: {
				delay: 150,
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
			</div>
		</MainLayout>
	);
}

export default CreateStoryTimeline;
