import { useRef, useState } from "react";
import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	RiAddBoxLine,
  } from "react-icons/ri";
  import "./NotepadStyle.css";
import { Draggable } from "../../components/ui/Draggable";
import { Droppable } from "../../components/ui/Droppable";
import MainLayout from "../../layout/MainLayout";
import TextBox from "./TextBox";

function CreateStoryTimeline() {
	const [objectList, setObjectList] = useState([]);
	const [count, setCount] = useState(1);

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
			<div className="bg-dimYellow h-screen w-full">
				<DndContext
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
					sensors={sensors}
				>
					<RiAddBoxLine onClick={() => addObject()} className="h-8 w-8 hover:text-secondary"/>
					<Droppable>
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
					</Droppable>
				</DndContext>
			</div>
		</MainLayout>
	);
}

export default CreateStoryTimeline;
