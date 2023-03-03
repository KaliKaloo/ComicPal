import React from "react";

function MainButton({ styles, text, onClick }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary outline-none rounded-full duration-200 ${styles}`}
		>
			{text}
		</button>
	);
}

export default MainButton;
