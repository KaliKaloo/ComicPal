import React from "react";

function SecondaryButton({ styles, text, onClick }) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`py-3 px-6  font-poppins font-medium text-[18px] rounded-md ${styles}duration-300`}
		>
			{text}
		</button>
	);
}

export default SecondaryButton;
