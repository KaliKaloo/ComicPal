import React from "react";
import { RiCloseLine } from "react-icons/ri";

function Timeline({ deleteTimelinePoint }) {
	return (
		<div className="h-32 w-full flex justify-center">
			<div className="relative w-full h-full flex justify-center items-center">
				<div className="h-full w-1 bg-gray-300"></div>
				<div className="absolute w-5 h-5 rounded-full bg-gray-400 z-10 items-center justify-center flex overflow-hidden">
					<RiCloseLine onClick={()=>deleteTimelinePoint()} className="w-full h-full text-gray-500 hover:text-white duration-100"/>
				</div>
			</div>
		</div>
	);
}

export default Timeline;
