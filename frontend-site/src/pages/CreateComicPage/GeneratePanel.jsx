import { useState, useRef } from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import EditModal from "./EditModal";
import useOnClickOutside from "../../hooks/useOnCliclOutside";

function GeneratePanel({ deleteFunc, shape }) {
  const [panelClick, setPanelClick] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState("");
  const ref = useRef();

  const handleOnCloseEditMode = (save, url, text) => {
    setEditMode(false);
    if (save) {
      setImageURL(url);
      setPrompt(text);
    }
  };

  useOnClickOutside(ref, () => setPanelClick(false));

  return (
    <div
      className={` ${
        panelClick ? "border-lightGreen border-4" : "border-black "
      } border-2 overflow-hidden bg-gray-100 resize ${
        shape === "square" ? "w-72 h-52" : " rounded-full w-72 h-72 "
      } `}
      onClick={() => setPanelClick(true)}
    >
      {panelClick ? (
        <div
          ref={ref}
          className="absolute inset-y-0 right-0 mr-[-3.5rem] z-10 flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg top-2/4 -translate-y-2/4 h-24 w-10 min-h-[auto] min-w-[44px] flex-col rounded-lg border"
        >
          <PencilIcon
            className="h-6 w-6 hover:cursor-pointer "
            onClick={() => setEditMode(true)}
          />

          <TrashIcon
            className="h-6 w-6hover:cursor-pointer "
            onClick={() => deleteFunc()}
          />
        </div>
      ) : (
        <></>
      )}

      <div className="overflow-hidden w-full h-full">
        {imageURL.length > 0 ? (
          <img
            src={imageURL}
            alt=""
            className="object-cover w-full h-full "
          ></img>
        ) : (
          <div></div>
        )}
      </div>

      {editMode ? (
        <EditModal
          onClose={handleOnCloseEditMode}
          imgUrl={imageURL}
          text={prompt}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default GeneratePanel;
