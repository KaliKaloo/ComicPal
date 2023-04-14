import React, { useState, useEffect, useRef } from "react";

export default function TestFocus() {
	const [textList, setTextList] = useState(0);
	const [bool, setbool] = useState(false);

	const textarea_ref = useRef(null);
	useEffect(() => {
		if (textarea_ref && textarea_ref.current) {
			textarea_ref.current.focus();
		}
	});

	return (
		<div>
			{/* <button onClick={() => setTextList(textList + 1)}>click</button> */}
			<button onClick={() => setbool(!bool)}>click</button>

			{bool && (
				<textarea
					ref={textarea_ref}
					name="the-textarea"
					id="the-textarea"
					maxLength="150"
					placeholder="see guidelines for suggestions..."
				></textarea>
			)}
			{/* {(() => {
				const arr = [];
				for (var i = 0; i < textList; i++) {
					arr.push(
						<textarea
							ref={textarea_ref}
							name="the-textarea"
							id="the-textarea"
							maxLength="150"
							placeholder="see guidelines for suggestions..."
						></textarea>
					);
				}
				return arr;
			})()} */}
		</div>
	);
}
