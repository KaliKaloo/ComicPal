import { useState } from "react";
import {
  ArrowRightCircleIcon,
  CheckIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

function EditModal({ onClose, imgUrl, text }) {
  const [prompt, setPrompt] = useState(text);
  const [imageURL, setImageURL] = useState(imgUrl);

  const generateImage = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3080/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    const res = await response.json();
    setImageURL(res.url);
  };

  const handleOnClose = (save) => {
    if (save) {
      onClose(true, imageURL, prompt);
    } else {
      onClose(false, "", "");
    }
  };

  return (
    <div
      id="container"
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-40"
    >
      <div className="flex flex-col justify-between space-y-2 bg-white p-2 rounded w-[60%] h-[70%]">
          <div className="overflow-hidden w-full h-full">
            {imageURL.length > 0 ? (
              <img
                src={imageURL}
                alt=""
                className="object-cover w-full h-full"
              ></img>
            ) : (
              <div className="h-[100%] flex justify-center items-center text-gray-300">image</div>
            )}
          </div>
          <div className=" bg-gray-200 bg-opacity-90 rounded-lg w-full mx-auto flex flex-row ">
            <textarea
              className="h-16 pt-2 text-center resize-y break-words bg-transparent font-poppins text-sm rounded-md mx-auto w-[85%] focus:outline-none "
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type a prompt..."
            />
            <ArrowRightCircleIcon
              className="h-6 w-6 mr-2 hover:cursor-pointer text-lightGreen"
              onClick={generateImage}
              aria-hidden="true"
            />
            <CheckIcon
              className="h-6 w-6 hover:cursor-pointer p-1"
              onClick={() => handleOnClose(true)}
            />
            <XMarkIcon
              className="h-6 w-6 hover:cursor-pointer p-1"
              onClick={() => handleOnClose(false)}
            />
          </div>
      </div>
    </div>
  );
}

export default EditModal;
