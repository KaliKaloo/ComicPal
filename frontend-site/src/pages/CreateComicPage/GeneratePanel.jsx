import { useState } from "react";
import "./CreateComicPage.css";
import {
  ArrowRightCircleIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

function modal() {
  return <div></div>;
}

function GeneratePanel({ deleteFunc }) {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [panelClick, setPanelClick] = useState(true);
  const [editMode, setEditMode] = useState(true);

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

  return (
    <div>
      {panelClick ? (
        <div
          className="absolute inset-y-0 right-0 mr-[-3.5rem] z-20 flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50  top-2/4 -translate-y-2/4 min-h-[auto] min-w-[44px] flex-col rounded-lg border
      "
        >
          {editMode ? (
            <CheckIcon
              className="h-6 w-6 hover:cursor-pointer p-1"
              onClick={() => setEditMode(false)}
            />
          ) : (
            <PencilIcon
              className="h-6 w-6 hover:cursor-pointer p-1"
              onClick={() => setEditMode(true)}
            />
          )}

          <TrashIcon
            className="h-6 w-6hover:cursor-pointer p-1"
            onClick={() => deleteFunc()}
          />
        </div>
      ) : (
        <></>
      )}

      <div
        className="border border-black overflow-hidden bg-gray-100 w-[400px] h-[200px] resize"
        onClick={() => setPanelClick(true)}
      >
        {imageURL.length > 0 ? (
          <img
            src={imageURL}
            alt=""
            className="object-cover w-full h-full"
          ></img>
        ) : (
          <div></div>
        )}

        {editMode ? (
          <div>
            <div className="absolute inset-x-0 bottom-0 mb-1 bg-white bg-opacity-90 rounded-lg w-[85%] mx-auto h-6 flex flex-row">
              <input
                className="text-center bg-transparent font-poppins text-sm rounded-md mx-auto w-[85%] focus:outline-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type a prompt..."
              />
              <ArrowRightCircleIcon
                className="h-6 w-6 mr-2 hover:cursor-pointer text-lightGreen"
                onClick={generateImage}
                aria-hidden="true"
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default GeneratePanel;
