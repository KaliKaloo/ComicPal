import React, { memo } from "react";

const Tooltip = memo((props) => {
	return (
		<span className="group relative">
			<span className="font-poppins text-sm pointer-events-none absolute -top-10 left-3/4 -translate-x-1/2 whitespace-nowrap rounded bg-gray-700 px-2 py-2 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-gray-700 before:content-[''] group-hover:opacity-100">
				{props.text}
			</span>
			{props.children}
		</span>
	);
});

Tooltip.displayName = "Tooltip";

export default Tooltip;
