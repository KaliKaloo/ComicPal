import styles from "../../assets/style";
import FeedbackCard from "../../components/ui/FeedbackCard";
import MainLayout from "../../layout/MainLayout";
import CharacterGenerator from "./CharacterGenerator";
import { useRef, useState } from "react";

function CreateCharacterPage() {
	const [charList, setCharList] = useState(
		JSON.parse(localStorage.getItem("charJSON") || "[]")
	);
	const [selectedChar, setSelectedChar] = useState();

	return (
		<MainLayout footer="noFooter">
			<div
				className={`${styles.flexCenter} bg-[#edecea] relative h-[calc(100vh-56px)] items-center justify-center font-poppins overflow-auto`}
			>
				<div className="w-[80%] md:w-[60%] h-[90%] my-12 ">
					<h1 className={`${styles.heading2}`}>Character List</h1>
					<div className="h-96 bg-white bg-opacity-30 rounded-lg border border-1 border-gray-600 border-opacity-20 shadow-sm grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-5 p-8 lg:mb-0 mb-10">
						{charList.map((char, index) => (
							<div
								onClick={() => setSelectedChar(char)}
								className="flex flex-col h-36 w-28 items-center gap-2 "
							>
								<div
									key={index}
									className=" w-28 h-28 bg-white rounded-full shadow-md hover:shadow-md hover:shadow-gray-400 hover:scale-110 duration-200 cursor-pointer overflow-hidden flex justify-center items-center"
								>
									<img
										src={char.img}
										alt="openai avatar"
										className="object-contain "
									/>
								</div>
								<p className="font-medium  text-sm">{char.name}</p>
							</div>
						))}
					</div>

					<CharacterGenerator />
				</div>
				<div className="fixed bottom-0 left-0 ml-[-2rem] md:scale-75 z-40 scale-0 duration-200">
					<FeedbackCard noIcon={true} />
				</div>
			</div>
		</MainLayout>
	);
}

export default CreateCharacterPage;
