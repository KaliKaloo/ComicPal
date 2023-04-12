import React from "react";

function MainButton({ href, styles, text, onClick, target }) {
	return (
		<a
			type="button"
			href={href || "#"}
			onClick={onClick}
			className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary outline-none rounded-full duration-200 ${styles}`}
			target={target}
		>
			{text}
		</a>
	);
}

export default MainButton;
