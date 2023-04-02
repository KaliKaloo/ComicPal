import React from "react";

function Timeline({id}) {
	return (
		<div className="h-32 w-full flex justify-center">
			<div class="relative w-full h-full flex justify-center items-center">
				<div class="h-full w-1 bg-gray-300"></div>
				<div class="absolute w-5 h-5 rounded-full bg-gray-400 z-10 text-white text-center ">
					{id}
				</div>
			</div>
		</div>
	);
}

export default Timeline;
