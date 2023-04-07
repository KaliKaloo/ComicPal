import {
	ArrowRightCircleIcon,
	CheckIcon,
	PhotoIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import autosize from "autosize/dist/autosize.js";
import { useState } from "react";
import Dropdown from "../../components/ui/Dropdown";
import Spinner from "../../components/ui/Spinner";
import MainButton from "../../components/ui/MainButton";
import SecondaryButton from "../../components/ui/SecondaryButton";

function EditModal({ onClose, imgUrl, text }) {
	const [prompt, setPrompt] = useState(text);
	const [imageURL, setImageURL] = useState(imgUrl);
	const realismLevels = ["0%", "25%", "50%", "75%", "100%"];
	const [realismLevel, setRealismLevel] = useState("");
	const styleOptions = [
		"n/a",
		"Oil Painting",
		"Watercolour",
		"Pencil Sketch",
		"Marvel Comics",
		"Cartoon",
		"Anime",
	];
	const [styleOption, setStyleOption] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const generateImage = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		let newPrompt =
			realismLevel === "" || realismLevel === "100%"
				? prompt
				: prompt + ". " + realismLevel + " photo realistic";

		newPrompt =
			styleOption === "n/a" || styleOption === ""
				? newPrompt
				: newPrompt + " " + styleOption + " style";

		console.log(newPrompt);
		const response = await fetch(
			process.env.NODE_ENV === "production"
				? "https://comicpal.vercel.app/image"
				: "http://localhost:3080/image",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					prompt: newPrompt,
				}),
			}
		);
		const res = await response.json();
		setImageURL(res.url);
		setIsLoading(false);
	};

	const handleOnClose = (save) => {
		if (save) {
			onClose(true, imageURL, prompt);
		} else {
			onClose(false, "", "");
		}
	};

	const handleRealismDropdown = (level) => {
		setRealismLevel(level);
	};

	const handleStyleDropdown = (style) => {
		setStyleOption(style);
	};

	// standalone script to automatically adjust textarea height
	autosize(document.querySelectorAll("textarea"));

	return (
		<div
			id="container"
			className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-40"
		>
			<div className="flex flex-col justify-between space-y-2">
				<div className=" bg-white p-2 rounded-lg">
					<div className="flex justify-end rounded-md">
						<div className="font-poppins flex gap-2 items-center">
							<span className=" text-sm font-medium text-gray-700">
								Style:
							</span>
							<Dropdown
								handleRealisim={handleStyleDropdown}
								defaultText={"..."}
								dropList={styleOptions}
							/>
							<span className="pl-4 text-sm font-medium text-gray-700">
								Realism:
							</span>
							<Dropdown
								handleRealisim={handleRealismDropdown}
								defaultText={"..."}
								dropList={realismLevels}
							/>
						</div>
					</div>

					<div className="overflow-hidden ">
						{isLoading ? (
							<div className="h-96 w-96 flex justify-center items-center">
								<Spinner />
							</div>
						) : imageURL !== "" ? (
							<img
								src={imageURL}
								alt=""
								className="object-cover items-center w-full h-full"
							></img>
						) : (
							<div className="h-96 w-96 flex justify-center items-center text-gray-300">
								<PhotoIcon
									className="h-20 w-20 hover:cursor-pointer"
									aria-hidden="true"
								/>
							</div>
						)}
					</div>

				{/* ---- SAVED STORY CHARACTERS ----*/}
					<div>
						<p>Add character:</p>
						{localStorage.getItem("charJSON")}
					</div>

					<div className="bg-gray-200 bg-opacity-90 rounded-lg w-full mx-auto flex flex-row items-center">
						<textarea
							id="textarea"
							className="h-8 p-1.5 text-center break-words bg-transparent font-poppins text-sm rounded-md mx-auto w-[85%] focus:outline-none resize-none "
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
							placeholder="Type a prompt..."
						/>
						<ArrowRightCircleIcon
							className="h-10 w-10 text-lightGreen hover:cursor-pointer mx-2 hover:bg-black hover:bg-opacity-10 rounded-md "
							onClick={generateImage}
						/>
					</div>
				</div>
				<div className="flex justify-center items-center ">
					<button
						onClick={() => handleOnClose(false)}
						className={`p-3 w-24 bg-secondary text-white hover:bg-[#E36021] m-2 text-base font-poppins font-medium rounded-full duration-300 `}
					>
						Cancel
					</button>
					<button
						onClick={() => handleOnClose(true)}
						className={`p-3 w-24 bg-lightGreen text-white hover:bg-[#007864] m-2 text-base font-poppins font-medium rounded-full duration-300`}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}

export default EditModal;
