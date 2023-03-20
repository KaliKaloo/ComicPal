import { useRef, useState } from "react";
import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
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
		console.log(objectList)
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
					<button onClick={() => addObject()}>click</button>
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
								{obj.type === "panel" && (
									<TextBox
										deleteFunc={() => deleteObject(obj.id)}
										focus={obj.focus}
									/>
								)}
							</Draggable>
						))}
					</Droppable>
				</DndContext>
			</div>
		</MainLayout>
	);
}

export default CreateStoryTimeline;
