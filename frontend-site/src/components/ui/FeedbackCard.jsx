import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

export default function FeedbackCard({ noIcon }) {
	return (
		<Link to="/FeedbackForm">
			<div className="max-w-sm p-6 bg-darkGreen hover:bg-mediumGreen duration-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-white">
				{noIcon ? (
					<></>
				) : (
					<PencilSquareIcon className="w-10 h-10 mb-2 text-white dark:text-gray-400" />
				)}

				<div className="mb-2 text-md font-semibold tracking-tight text-light">
					Enjoying using ComicPal?
				</div>
				<p className="font-normal text-sm text-white">
					Let us know what you think by filling out the{" "}
					<span className="text-secondary">feedback form</span>
				</p>
			</div>
		</Link>
	);
}
