import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import Dropdown from "../../components/ui/Dropdown";
import {
  ArrowRightCircleIcon,
  CheckIcon,
  XMarkIcon,
  PhotoIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import autosize from "autosize/dist/autosize.js";
import Spinner from "../../components/ui/Spinner";

function EditModal({ onClose, imgUrl, text }) {
  const [prompt, setPrompt] = useState(text);
  const [imageURL, setImageURL] = useState(imgUrl);
  const realismLevels = ["0%", "30%", "50%", "70%", "100%"]
  const [realismLevel, setRealismLevel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    let newPrompt = realismLevel==="" ||realismLevel==="100%" ? prompt : prompt+". "+realismLevel+" photo realistic"
    console.log(newPrompt)
    const response = await fetch("https://ai-tool-for-comics-7os3poqub-kalikaloo.vercel.app/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: newPrompt,
      }),
    });
    const res = await response.json();
    setImageURL(res.url);
    setIsLoading(false)
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
  }

  // standalone script to automatically adjust textarea height
  autosize(document.querySelectorAll("textarea"));

  return (
    <div
      id="container"
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-40"
    >
      <div className="flex flex-col justify-between space-y-2 bg-white p-2 rounded">
        <div className="flex justify-between rounded-md">
          <XMarkIcon
            className="text-right h-8 w-8 hover:cursor-pointer text-black"
            onClick={() => handleOnClose(false)}
          />
          
          <Dropdown handleRealisim={handleRealismDropdown} defaultText={"Realisim"} dropList={realismLevels}/>

        </div>
        <div className="overflow-hidden w-full h-full">
          
          {imageURL !=="" ? (
            <img
              src={imageURL}
              alt=""
              className="object-cover w-full h-full"
            ></img>
          ) : (isLoading) ? 
          <div className="flex justify-center items-center">
            <Spinner/>
          </div>
          :(
            <div className="h-80 w-96 flex justify-center items-center text-gray-300">
              <PhotoIcon
                className="h-20 w-20 hover:cursor-pointer"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        <div className="bg-gray-200 bg-opacity-90 rounded-lg w-full mx-auto flex flex-row items-center">
          <textarea
            id="textarea"
            className="h-8 pt-1.5 text-center break-words bg-transparent font-poppins text-sm rounded-md mx-auto w-[85%] focus:outline-none resize-none "
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type a prompt..."
          />
          <ArrowRightCircleIcon
            className="h-7 w-7 hover:cursor-pointer text-lightGreen rounded-full hover:bg-lightGreen hover:bg-opacity-20"
            onClick={generateImage}
            aria-hidden="true"
          />
          <CheckIcon
            className="h-7 w-7 hover:cursor-pointer mx-2 hover:bg-gray-300 rounded-full "
            onClick={() => handleOnClose(true)}
          />
        </div>
      </div>
    </div>
  );
}

export default EditModal;
