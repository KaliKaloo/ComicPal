import getStroke from "perfect-freehand";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import { BiUndo, BiRedo } from "react-icons/bi";
import { BsSquare, BsArrowsMove, BsBrush, BsSlashLg } from "react-icons/bs";
const generator = rough.generator();

const createElement = (id, x1, y1, x2, y2, type) => {
	switch (type) {
		case "line":
		case "rectangle":
			const roughElement =
				type === "line"
					? generator.line(x1, y1, x2, y2)
					: generator.rectangle(x1, y1, x2 - x1, y2 - y1);
			return { id, x1, y1, x2, y2, type, roughElement };
		case "pencil":
			return { id, type, points: [{ x: x1, y: y1 }] };
		default:
			throw new Error(`Type not recognised: ${type}`);
	}
};

const nearPoint = (x, y, x1, y1, name) => {
	return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
};

const onLine = (x1, y1, x2, y2, x, y, maxDistance = 1) => {
	const a = { x: x1, y: y1 };
	const b = { x: x2, y: y2 };
	const c = { x, y };
	const offset = distance(a, b) - (distance(a, c) + distance(b, c));
	return Math.abs(offset) < maxDistance ? "inside" : null;
};

const positionWithinElement = (x, y, element) => {
	const { type, x1, x2, y1, y2 } = element;
	switch (type) {
		case "line":
			const on = onLine(x1, y1, x2, y2, x, y);
			const start = nearPoint(x, y, x1, y1, "start");
			const end = nearPoint(x, y, x2, y2, "end");
			return start || end || on;
		case "rectangle":
			const topLeft = nearPoint(x, y, x1, y1, "tl");
			const topRight = nearPoint(x, y, x2, y1, "tr");
			const bottomLeft = nearPoint(x, y, x1, y2, "bl");
			const bottomRight = nearPoint(x, y, x2, y2, "br");
			const inside =
				x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
			return topLeft || topRight || bottomLeft || bottomRight || inside;
		case "pencil":
			const betweenAnyPoint = element.points.some((point, index) => {
				const nextPoint = element.points[index + 1];
				if (!nextPoint) return false;
				return (
					onLine(
						point.x,
						point.y,
						nextPoint.x,
						nextPoint.y,
						x,
						y,
						5
					) != null
				);
			});
			return betweenAnyPoint ? "inside" : null;
		default:
			throw new Error(`Type not recognised: ${type}`);
	}
};

const distance = (a, b) =>
	Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElementAtPosition = (x, y, elements) => {
	return elements
		.map((element) => ({
			...element,
			position: positionWithinElement(x, y, element),
		}))
		.find((element) => element.position !== null);
};

const adjustElementCoordinates = (element) => {
	const { type, x1, y1, x2, y2 } = element;
	if (type === "rectangle") {
		const minX = Math.min(x1, x2);
		const maxX = Math.max(x1, x2);
		const minY = Math.min(y1, y2);
		const maxY = Math.max(y1, y2);
		return { x1: minX, y1: minY, x2: maxX, y2: maxY };
	} else {
		if (x1 < x2 || (x1 === x2 && y1 < y2)) {
			return { x1, y1, x2, y2 };
		} else {
			return { x1: x2, y1: y2, x2: x1, y2: y1 };
		}
	}
};

const cursorForPosition = (position) => {
	switch (position) {
		case "tl":
		case "br":
		case "start":
		case "end":
			return "nwse-resize";
		case "tr":
		case "bl":
			return "nesw-resize";
		default:
			return "move";
	}
};

const resizedCoordinates = (clientX, clientY, position, coordinates) => {
	const { x1, y1, x2, y2 } = coordinates;
	switch (position) {
		case "tl":
		case "start":
			return { x1: clientX, y1: clientY, x2, y2 };
		case "tr":
			return { x1, y1: clientY, x2: clientX, y2 };
		case "bl":
			return { x1: clientX, y1, x2, y2: clientY };
		case "br":
		case "end":
			return { x1, y1, x2: clientX, y2: clientY };
		default:
			return null; //should not really get here...
	}
};

const useHistory = (initialState) => {
	const [index, setIndex] = useState(0);
	const [history, setHistory] = useState([initialState]);

	const setState = (action, overwrite = false) => {
		const newState =
			typeof action === "function" ? action(history[index]) : action;
		if (overwrite) {
			const historyCopy = [...history];
			historyCopy[index] = newState;
			setHistory(historyCopy);
		} else {
			const updatedState = [...history].slice(0, index + 1);
			setHistory([...updatedState, newState]);
			setIndex((prevState) => prevState + 1);
		}
	};

	const undo = () => index > 0 && setIndex((prevState) => prevState - 1);
	const redo = () =>
		index < history.length - 1 && setIndex((prevState) => prevState + 1);

	return [history[index], setState, undo, redo];
};

const getSvgPathFromStroke = (stroke) => {
	if (!stroke.length) return "";

	const d = stroke.reduce(
		(acc, [x0, y0], i, arr) => {
			const [x1, y1] = arr[(i + 1) % arr.length];
			acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
			return acc;
		},
		["M", ...stroke[0], "Q"]
	);

	d.push("Z");
	return d.join(" ");
};

const drawElement = (roughCanvas, context, element) => {
	switch (element.type) {
		case "line":
		case "rectangle":
			roughCanvas.draw(element.roughElement);
			break;
		case "pencil":
			const stroke = getSvgPathFromStroke(
				getStroke(element.points, { size: 2 })
			);
			context.fill(new Path2D(stroke));
			break;
		default:
			throw new Error(`Type not recognised: ${element.type}`);
	}
};

const adjustmentRequired = (type) => ["line", "rectangle"].includes(type);

const DrawingCanvas = ({ pages, pageWidth, pageHeight, drawingMode }) => {
	const [elements, setElements, undo, redo] = useHistory([]);
	const [action, setAction] = useState("none");
	const [tool, setTool] = useState("pencil");
	const [selectedElement, setSelectedElement] = useState(null);
	const ref = useRef(null);

	useLayoutEffect(() => {
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
		context.clearRect(0, 0, canvas.width, canvas.height);

		const roughCanvas = rough.canvas(canvas);

		elements.forEach((element) =>
			drawElement(roughCanvas, context, element)
		);
	}, [elements, pages]);

	useEffect(() => {
		const undoRedoFunction = (event) => {
			if ((event.metaKey || event.ctrlKey) && event.key === "z") {
				if (event.shiftKey) {
					redo();
				} else {
					undo();
				}
			}
		};

		document.addEventListener("keydown", undoRedoFunction);
		return () => {
			document.removeEventListener("keydown", undoRedoFunction);
		};
	}, [undo, redo]);

	const updateElement = (id, x1, y1, x2, y2, type) => {
		const elementsCopy = [...elements];

		switch (type) {
			case "line":
			case "rectangle":
				elementsCopy[id] = createElement(id, x1, y1, x2, y2, type);
				break;
			case "pencil":
				elementsCopy[id].points = [
					...elementsCopy[id].points,
					{ x: x2, y: y2 },
				];
				break;
			default:
				throw new Error(`Type not recognised: ${type}`);
		}

		setElements(elementsCopy, true);
	};

	const handleMouseDown = (event) => {
		if (drawingMode) {
			const { clientX, clientY } = getCursorPosition(event);

			if (tool === "selection") {
				const element = getElementAtPosition(
					clientX,
					clientY,
					elements
				);
				if (element) {
					if (element.type === "pencil") {
						const xOffsets = element.points.map(
							(point) => clientX - point.x
						);
						const yOffsets = element.points.map(
							(point) => clientY - point.y
						);
						setSelectedElement({ ...element, xOffsets, yOffsets });
					} else {
						const offsetX = clientX - element.x1;
						const offsetY = clientY - element.y1;
						setSelectedElement({ ...element, offsetX, offsetY });
					}
					setElements((prevState) => prevState);

					if (element.position === "inside") {
						setAction("moving");
					} else {
						setAction("resizing");
					}
				}
			} else {
				const id = elements.length;
				const element = createElement(
					id,
					clientX,
					clientY,
					clientX,
					clientY,
					tool
				);
				setElements((prevState) => [...prevState, element]);
				setSelectedElement(element);

				setAction("drawing");
			}
		}
	};

	const handleMouseMove = (event) => {
		if (drawingMode) {
			const { clientX, clientY } = getCursorPosition(event);

			if (tool === "selection") {
				const element = getElementAtPosition(
					clientX,
					clientY,
					elements
				);
				event.target.style.cursor = element
					? cursorForPosition(element.position)
					: "default";
			}

			if (action === "drawing") {
				const index = elements.length - 1;
				const { x1, y1 } = elements[index];
				updateElement(index, x1, y1, clientX, clientY, tool);
			} else if (action === "moving") {
				if (selectedElement.type === "pencil") {
					const newPoints = selectedElement.points.map(
						(_, index) => ({
							x: clientX - selectedElement.xOffsets[index],
							y: clientY - selectedElement.yOffsets[index],
						})
					);
					const elementsCopy = [...elements];
					elementsCopy[selectedElement.id] = {
						...elementsCopy[selectedElement.id],
						points: newPoints,
					};
					setElements(elementsCopy, true);
				} else {
					const { id, x1, x2, y1, y2, type, offsetX, offsetY } =
						selectedElement;
					const width = x2 - x1;
					const height = y2 - y1;
					const newX1 = clientX - offsetX;
					const newY1 = clientY - offsetY;
					updateElement(
						id,
						newX1,
						newY1,
						newX1 + width,
						newY1 + height,
						type
					);
				}
			} else if (action === "resizing") {
				const { id, type, position, ...coordinates } = selectedElement;
				const { x1, y1, x2, y2 } = resizedCoordinates(
					clientX,
					clientY,
					position,
					coordinates
				);
				updateElement(id, x1, y1, x2, y2, type);
			}
		}
	};

	const handleMouseUp = () => {
		if (drawingMode) {
			if (selectedElement) {
				const index = selectedElement.id;
				const { id, type } = elements[index];
				if (
					(action === "drawing" || action === "resizing") &&
					adjustmentRequired(type)
				) {
					const { x1, y1, x2, y2 } = adjustElementCoordinates(
						elements[index]
					);
					updateElement(id, x1, y1, x2, y2, type);
				}
			}
			setAction("none");
			setSelectedElement(null);
		}
	};

	const getCursorPosition = (event) => {
		if (!ref.current) {
			return;
		}

		const rect = ref.current.getBoundingClientRect();

		return {
			clientX: event.clientX - rect.left,
			clientY: event.clientY - rect.top,
		};
	};

	return (
		<div>
			{drawingMode && (
				<div className="flex justify-center">
					<div className="z-20 flex flex-row justify-center items-center shrink-0 grow-0 gap-6 border-t border-gray-200 bg-white/50 p-1 shadow-lg backdrop-blur-lg top-[-3.5rem] absolute min-h-[auto] rounded-lg border text-sm ">
						<div className="flex gap-4 justify-between items-center">
							<div
								className={`flex gap-2 items-center p-2 rounded-full hover:bg-gray-200 ${
									tool === "selection" && "text-secondary"
								}`}
							>
								<BsArrowsMove
									id="selection"
									checked={tool === "selection"}
									onClick={() => setTool("selection")}
									className="w-6 h-6"
								/>
							</div>

							<div
								className={`flex gap-2 items-center p-2 rounded-full hover:bg-gray-200 ${
									tool === "line" && "text-secondary"
								}`}
							>
								<BsSlashLg
									id="line"
									checked={tool === "line"}
									onClick={() => setTool("line")}
									className="w-6 h-6"
								/>
							</div>

							<div
								className={`flex gap-2 items-center p-2 rounded-full hover:bg-gray-200 ${
									tool === "rectangle" && "text-secondary"
								}`}
							>
								<BsSquare
									id="rectangle"
									checked={tool === "rectangle"}
									onClick={() => setTool("rectangle")}
									className="w-6 h-6"
								/>
							</div>
							<div
								className={`flex gap-2 items-center p-2 rounded-full hover:bg-gray-200 ${
									tool === "pencil" && "text-secondary"
								}`}
							>
								<BsBrush
									id="pencil"
									checked={tool === "pencil"}
									onClick={() => setTool("pencil")}
									className="w-6 h-6"
								/>
							</div>
						</div>

						<div className="w-1 h-6 bg-gray-200" />

						<div className="flex gap-2 items-center">
							<BiUndo
								onClick={undo}
								className="h-8 w-8 hover:bg-gray-200 rounded-full"
							>
								Undo
							</BiUndo>
							<BiRedo
								onClick={redo}
								className="h-8 w-8 hover:bg-gray-200 rounded-full"
							>
								Redo
							</BiRedo>
						</div>
					</div>
				</div>
			)}
			<canvas
				id="canvas"
				ref={ref}
				className={`absolute z-40 ${
					!drawingMode && "pointer-events-none"
				}`}
				width={pages * pageWidth}
				height={pageHeight}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
			></canvas>
		</div>
	);
};

export default DrawingCanvas;
