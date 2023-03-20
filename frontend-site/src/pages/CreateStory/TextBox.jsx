import { useRef, useState } from "react";
import useOnClickOutside from "../../lib/useOnClickOutside";

function TextBox({ deleteFunc, focus }) {
	const [panelClick, setPanelClick] = useState(true);
	const panelRef = useRef();

	const handleOnCloseEditMode = (save, url, text) => {};

	useOnClickOutside(panelRef, () => setPanelClick(false));

	return (
		<div
			className={` ${
				panelClick || focus === "onFocus"
					? " border-lightGreen border-dotted border-4"
					: "border-black "
			} border-2 overflow-hidden bg-gray-100 resize w-72 h-52`}
			onClick={() => setPanelClick(true)}
		>
			<div ref={panelRef} className="overflow-hidden w-full h-full">
				helloooo
			</div>
		</div>
	);
}

export default TextBox;
