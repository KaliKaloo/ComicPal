import styles from "../../assets/style";
import FeedbackCard from "../../components/ui/FeedbackCard";
import Popup from "../../components/ui/Popup";
import MainLayout from "../../layout/MainLayout";
import CharacterGenerator from "./CharacterGenerator";
import { useEffect, useState } from "react";
import { RiAddLine, RiCloseLine } from "react-icons/ri";

function CreateCharacterPage() {
	const [charList, setCharList] = useState(
		JSON.parse(localStorage.getItem("charJSON") || "[]")
	);
	const [selectedChar, setSelectedChar] = useState();
	const [openGenerator, setOpenGenerator] = useState(false);
	const [deleteChar, setDeleteChar] = useState();
	const [deletePopup, setDeletePopup] = useState(false);

	const openCharacterGenerator =()=>{
		console.log("hello")
		setOpenGenerator(false);
		setOpenGenerator(true);
	}

	const handleDeletePopupClick = (char) => {
		setDeleteChar(char);
		setDeletePopup(true);
	};
	const handleDeleteChar = (deleteCharBool) => {
		if (deleteCharBool) {
			setCharList(charList.filter((char) => char.id !== deleteChar.id));
			setDeletePopup(false);
		} else {
			setDeletePopup(false);
		}
	};

	useEffect(() => {
		document.title = "ComicPal | Create a Character";
		localStorage.setItem("charJSON", JSON.stringify(charList));
	}, [charList]);

	return (
		<MainLayout footer="noFooter">
			{deletePopup && <Popup deleteFunc={handleDeleteChar} />}
			<div
				className={`${styles.flexCenter} bg-[#edecea] relative h-[calc(100vh-56px)] items-center justify-center font-poppins overflow-auto `}
			>
				<div className="w-[80%] md:w-[60%] h-[90%] mt-12">
					<h1 className={`${styles.heading2}`}>Character List</h1>
					<div className="h-96 bg-white bg-opacity-30 rounded-lg border border-1 border-gray-600 border-opacity-20 shadow-sm grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-5 p-8  overflow-y-auto mb-10">
						{charList.map((char, index) => (
							<div
								key={index}
								onClick={() => setSelectedChar(char)}
								className="flex flex-col h-36 w-28 items-center gap-2 realtive group"
							>
								<div className=" w-28 h-28 bg-white rounded-full shadow-md hover:shadow-md hover:shadow-gray-400 hover:scale-110 duration-200 cursor-pointer overflow-hidden flex justify-center items-center">
									<img
										src={char.img}
										alt="openai avatar"
										className="object-contain "
									/>
								</div>
								<div
									onClick={() => handleDeletePopupClick(char)}
									className="absolute mr-[-7.5rem] z-10 text-gray-500  opacity-0 group-hover:opacity-100 cursor-pointer rounded-full hover:bg-gray-300"
								>
									<RiCloseLine className="w-6 h-6" />
								</div>
								<p className="font-medium  text-sm">
									{char.name}
								</p>
							</div>
						))}
						<div
							onClick={openCharacterGenerator}
							className="flex flex-col h-36 w-28 items-center gap-2 "
						>
							<div className=" w-28 h-28 bg-black bg-opacity-10 rounded-full shadow-md hover:shadow-md hover:shadow-gray-400 hover:scale-110 duration-200 cursor-pointer overflow-hidden flex justify-center items-center">
								<RiAddLine className="w-10 h-10 text-gray-400" />
							</div>
						</div>
					</div>

					{openGenerator ? (
						<div className="h-full w-full">
							<p
								className="w-full my-5 text-right hover:text-secondary cursor-pointer text-gray-500 duration-200"
								onClick={() => setOpenGenerator(false)}
							>
								close
							</p>
							<CharacterGenerator
								setCharList={setCharList}
								setOpenGenerator={setOpenGenerator}
							/>
						</div>
					) : (
						<></>
					)}
				</div>
				<div className="fixed bottom-0 left-0 ml-[-2rem] md:scale-75 z-40 scale-0 duration-200">
					<FeedbackCard noIcon={true} />
				</div>
			</div>
		</MainLayout>
	);
}

export default CreateCharacterPage;
