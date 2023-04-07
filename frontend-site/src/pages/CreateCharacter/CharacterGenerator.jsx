import { PhotoIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../../components/ui/Spinner";
import exportAsImage from "../../lib/exportAsImage";
import React from "react";
import styles from "../../assets/style";
import { v4 as uuidv4 } from 'uuid';

function CharacterGenerator({setCharList}) {
	const [imageURL, setImageURL] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const exportRef = useRef();

	const onSubmit = async (data) => {
		setIsLoading(true);

		// fix this to be better
		var combinedData =
			data.gender +
			" with " +
			data.eyeColor +
			" colored eyes. " +
			data.hair +
			" hair. " +
			data.skin +
			"skin. " +
			data.other;

		/* ----- fetch request to get the AI generated image from the prompt ----- */
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
					prompt: combinedData,
				}),
			}
		);
		const res = await response.json();
		setImageURL(res.url);
		var newID = uuidv4();
		var charList = JSON.parse(localStorage.getItem("charJSON") || "[]");
		var newName =
			data.name === "" ? "char " + (newID.substring(0, 7)) : data.name;
		var newChar = {
			id: newID,
			name: newName,
			data: combinedData,
			img: res.url
		};
		charList.push(newChar);
		localStorage.setItem("charJSON", JSON.stringify(charList));
		setCharList(charList)
		console.log(charList);
		
		setIsLoading(false);

		// localStorage.removeItem("charJSON")
		// localStorage.clear()
	};

	function handleDownload() {
		exportAsImage(exportRef.current, "page1");
	}
	return (
		<div className=" flex flex-col gap-10 h-full w-full">
			<div className="flex-1 flex lg:flex-row flex-col justify-between gap-4 ">
				<div
					className="relative flex-1 bg-white items-center justify-center flex h-[70%] w-[70%] rounded-md shadow-lg  mx-auto"
					ref={exportRef}
				>
					<div
						onClick={() => handleDownload()}
						className="absolute top-0 right-0 mr-[3.5rem] mt-[-1.6em] text-sm text-gray-500 hover:text-secondary cursor-pointer  w-5 h-5"
					>
						Download
					</div>
					{isLoading ? (
						<div className="flex justify-center items-center">
							<Spinner />
						</div>
					) : imageURL !== "" ? (
						<img
							src={imageURL}
							alt=""
							className="object-contain"
						></img>
					) : (
						<div className="h-80 w-96 flex justify-center items-center text-gray-300">
							<PhotoIcon
								className="h-20 w-20 hover:cursor-pointer"
								aria-hidden="true"
							/>
						</div>
					)}
				</div>

				<div className="flex-1 w-full mb-10">
					<form
						className="flex flex-col space-y-3  w-full"
						onSubmit={handleSubmit(onSubmit)}
					>
						<label className="block text-gray-700 text-md font-bold mb-2">
							Name
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							id="Name"
							{...register("name")}
						/>
						<label className="block text-gray-700 text-md font-bold mb-2">
							Gender
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							id="Gender"
							{...register("gender")}
						/>
						<label className="block text-gray-700 text-md font-bold mb-2">
							Eye Color
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							id="EyeColor"
							{...register("eyeColor")}
						/>
						<label className="block text-gray-700 text-md font-bold mb-2">
							Skin description
						</label>
						<textarea
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							id="Skin"
							{...register("skin")}
						/>
						<label className="block text-gray-700 text-md font-bold mb-2">
							Hair description
						</label>
						<textarea
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							id="Hair"
							{...register("hair")}
						/>
						<label className="block text-gray-700 text-md font-bold mt-3 mb-2">
							More details
						</label>
						<textarea
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							id="Other"
							{...register("other")}
						/>
						<div className="flex justify-center">
							<button
								type="submit"
								className={`py-3 px-6  font-poppins font-medium text-[18px] rounded-full ${styles}duration-300 w-36 h-20 bg-lightGreen text-white hover:bg-[#007864]`}
							>
								Generate
							</button>
						</div>
					</form>
				</div>
			</div>

			{/* <div className="flex-1"> */}
			{/* <div>
              Personality: Text generate Background: Text generate Other: Text
              generate
            </div>
            <SecondaryButton
              text="Generate a character description"
              styles={" w-32 bg-lightGreen text-white hover:bg-[#007864]"}
            /> */}
			{/* </div> */}
		</div>
	);
}

export default CharacterGenerator;
