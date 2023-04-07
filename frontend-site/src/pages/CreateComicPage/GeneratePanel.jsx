import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRef, useState, Component } from "react";
import useOnClickOutside from "../../lib/useOnClickOutside";
import EditModal from "./EditModal";
import { createPortal } from "react-dom";

function GeneratePanel({ deleteFunc, shape, focus, editModeAppear }) {
	const [panelClick, setPanelClick] = useState(true);
	const [editMode, setEditMode] = useState(false);
	const [prompt, setPrompt] = useState("");
	const [imageURL, setImageURL] = useState("");
	const [charInPrompt, setCharInPrompt] = useState([]);
	const panelRef = useRef();

	const handleOnCloseEditMode = (save, url, text, charList) => {
		setEditMode(false);
		if (save) {
			setImageURL(url);
			setPrompt(text);
			setCharInPrompt(charList);
		}
	};

	// const handleTierGaterClick = (e) => {
	// 	e.stopPropagation(e);
	// 	e.preventDefault(e);
	// };

	useOnClickOutside(panelRef, () => setPanelClick(false));

	return (
		<div
			className={` ${
				panelClick || focus === "onFocus"
					? " border-lightGreen border-dotted border-4"
					: "border-black "
			} border-2 overflow-hidden bg-gray-100 resize ${
				shape === "square" ? "w-72 h-52" : " rounded-full w-72 h-72 "
			}`}
			onClick={() => setPanelClick(true)}
		>
			{panelClick ? (
				<div
					ref={panelRef}
					className="absolute inset-y-0 right-0 mr-[-3.5rem] z-10 flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg top-2/4 -translate-y-2/4 h-24 w-10 min-h-[auto] min-w-[44px] flex-col rounded-lg border"
				>
					<PencilIcon
						className="h-6 w-6 hover:cursor-pointer "
						onClick={() => setEditMode(true)}
					/>

					<TrashIcon
						className="h-6 w-6hover:cursor-pointer "
						onClick={() => deleteFunc()}
					/>
				</div>
			) : (
				<></>
			)}

			<div className="overflow-hidden w-full h-full  cursor-move">
				{imageURL.length > 0 ? (
					<img
						src={imageURL}
						alt=""
						className="object-cover w-full h-full "
					></img>
				) : (
					<div></div>
				)}
			</div>

			{editMode ? (
				<div>
					<EditModal
						onClose={handleOnCloseEditMode}
						imgUrl={imageURL}
						text={prompt}
						charInPromptList={charInPrompt}
					/>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default GeneratePanel;
