import { useState, useRef } from "react";
import autosize from "autosize/dist/autosize.js";
import useOnClickOutside from "../../lib/useOnClickOutside";
import {
	StopIcon,
	ChatBubbleOvalLeftIcon,
	ChatBubbleLeftIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";

function TextBox({ deleteFunc, focus }) {
	const [bubbleClick, setbubbleClick] = useState(true);
	const [text, setText] = useState("");
	const [shape, setShape] = useState("round");
	const panelRef = useRef();

	useOnClickOutside(panelRef, () => setbubbleClick(false));

	// standalone script to automatically adjust textarea height
	autosize(document.querySelectorAll("textarea"));

	return (
		<div
			className={` ${
				bubbleClick || focus === "onFocus"
					? " border-lightGreen border-dotted border-4"
					: "border-black "
			} border-2 overflow-hidden bg-white resize justify-center items-center flex flex-col h-40 w-60  `}
			onClick={() => setbubbleClick(true)}
		>
			<div
				className={`relative w-full h-full p-2 cursor-move`}
			>
				<div
					id="textarea"
					contenteditable="true"
					className="break-words font-poppins text-sm w-full h-full resize-none focus:outline-none "
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Enter text"
				/>
			</div>

			{bubbleClick ? (
				<div
					ref={panelRef}
					className="absolute inset-y-0 right-0 mr-[-3.5rem] z-10 flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg top-2/4 -translate-y-2/4 h-12 w-10 min-h-[auto] min-w-[44px] flex-col rounded-lg border"
				>
					<TrashIcon
						className="h-6 w-6hover:cursor-pointer "
						onClick={() => deleteFunc()}
					/>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default TextBox;
