import { useState } from "react";
import {
  ArrowRightCircleIcon,
  CheckIcon,
  XMarkIcon,
  PhotoIcon
} from "@heroicons/react/24/outline";
import autosize from "autosize/dist/autosize.js"


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
  
  // standalone script to automatically adjust textarea height
  autosize(document.querySelectorAll('textarea'));

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
              <div className="h-[100%] flex justify-center items-center text-gray-300">
                 <PhotoIcon
                    className="h-20 w-20 hover:cursor-pointer p-1"
                    aria-hidden="true"
                  />
              </div>
            )}
          </div>
          <div className="bg-gray-200 bg-opacity-90 rounded-lg w-full mx-auto flex flex-row items-center">
            <textarea id="textarea"
              className="h-8 pt-1.5 text-center break-words bg-transparent font-poppins text-sm rounded-md mx-auto w-[85%] focus:outline-none resize-y-auto "
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
