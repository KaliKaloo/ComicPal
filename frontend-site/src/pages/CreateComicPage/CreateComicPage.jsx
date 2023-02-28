import { useState, useRef } from "react";
import MainLayout from "../../layout/MainLayout";
import GeneratePanel from "./GeneratePanel";
import {
  DndContext,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { Draggable } from "../../components/ui/Draggable";
import { Droppable } from "../../components/ui/Droppable";
import {
  RectangleGroupIcon,
  ChatBubbleOvalLeftIcon,
  PlusIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Tooltip from "../../components/ui/Tooltip";
import GenerateTextBubble from "./GenerateTextBubble";
import FeedbackCard from "../../components/ui/FeedbackCard";

function CreateComicPage() {
  const [objectList, setObjectList] = useState([]);
  const [count, setCount] = useState(1);
  const [newPage, setNewPage] = useState(false);
  const [pageSize, setPageSize] = useState("a4");
  // const exportRef = useRef();

  const addObject = (type, shape) => {
    setObjectList([
      ...objectList,
      {
        id: count,
        type: type,
        position: { x: 100, y: 100 },
        shape: shape,
        focus: "",
      },
    ]);
    setCount(count + 1);
  };

  const deleteObject = (id) => {
    setObjectList(objectList.filter((panel) => panel.id !== id));
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 8,
      },
    })
  );

  function handleDragStart(ev) {
    const object = objectList.find((x) => x.id === ev.active.id);
    object.focus = "onFocus";
    const _newList = objectList.map((x) => {
      if (x.id === object.id) return object;
      return x;
    });
    setObjectList(_newList);
  }

  function handleDragEnd(ev) {
    const object = objectList.find((x) => x.id === ev.active.id);
    object.position.x += ev.delta.x;
    object.position.y += ev.delta.y;
    object.focus = "";
    const _newList = objectList.map((x) => {
      if (x.id === object.id) return object;
      return x;
    });
    setObjectList(_newList);
  }

  function handleDownload() {
    // exportAsImage(exportRef.current, "page1");
  }

  return (
    <MainLayout footer="noFooter">
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <div className="bg-[#edecea] relative h-[calc(100vh-56px)] items-center">
          <div className="absolute bottom-0 left-0 ml-[-2rem] md:scale-75 z-40 scale-0 duration-200">
            <FeedbackCard noIcon={true} />
          </div>
          <div
            className={`z-20 flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg  fixed top-2/4 -translate-y-2/4 left-3 min-h-[auto] lg:min-w-[64px] min-w-[40px] flex-col rounded-lg border`}
          >
            <div>
              <Tooltip text="Square Panel">
                <RectangleGroupIcon
                  onClick={() => addObject("panel", "square")}
                  className="flex aspect-square min-h-[32px] lg:w-16 w-10 flex-col items-center justify-center gap-1 rounded-md p-1.5  text-gray-700 hover:bg-gray-200 "
                />
              </Tooltip>
              <Tooltip text="Round Panel">
                <PlusCircleIcon
                  onClick={() => addObject("panel", "circle")}
                  className="flex aspect-square min-h-[32px] lg:w-16 w-10 flex-col items-center justify-center gap-1 rounded-md p-1.5  text-gray-700 hover:bg-gray-200 "
                />
              </Tooltip>
              <Tooltip text="Speech Bubble">
                <ChatBubbleOvalLeftIcon
                  onClick={() => addObject("speech")}
                  className="flex aspect-square min-h-[32px] lg:w-16 w-10 flex-col items-center justify-center gap-1 rounded-md p-1.5  text-gray-700 hover:bg-gray-200 "
                />
              </Tooltip>
            </div>
          </div>

          <div
            className={`flex ${
              newPage ? "justify-start ml-20" : "justify-center"
            } flex-1 p-12 h-full overflow-auto `}
          >
            <Droppable styles={`h-a4`}>
              {/* THE COMIC PAGES */}
              <div className="relative" 
              // ref={exportRef}
              >
                <div className={`flex `}>
                  <div
                    id="page1"
                    className={` relative shadow-md bg-white ${
                      pageSize === "a4"
                        ? "w-a4 h-a4"
                        : "w-smallerPage h-smallerPage"
                    }`}
                  >
                    <select
                      onChange={(e) => setPageSize(e.target.value)}
                      className="w-28 font-poppins text-sm absolute top-0 left-0 mt-[-1.6rem] h-5 text-gray-500 text-center outline-none bg-transparent"
                    >
                      <option value="a4">210 x 297</option>
                      <option value="smallerPage">174 x 264</option>
                    </select>
                    {/* <div
                      onClick={() => handleDownload()}
                      className="absolute top-0 right-0 mr-[5.5rem] mt-[-1.6em] text-gray-500 hover:text-secondary cursor-pointer  w-5 h-5"
                    >
                      Download
                    </div> */}
                    {!newPage ? (
                      <PlusIcon
                        onClick={() => setNewPage(true)}
                        className="absolute top-0 right-0 mt-[-1.6em] hover:bg-[#e0dfdb] rounded-full w-5 h-5"
                      />
                    ) : (
                      <XMarkIcon
                        onClick={() => setNewPage(false)}
                        className="absolute top-0 right-[-2rem] mt-[-1.6em] hover:bg-[#e0dfdb] rounded-full w-5 h-5"
                      />
                    )}
                  </div>
                  <div>
                    {newPage ? (
                      <div className="flex">
                        <div className="h-a4 w-[16px] bg-gray-300" />
                        <div
                          className={` relative shadow-md bg-white ${
                            pageSize === "a4"
                              ? "w-a4 h-a4"
                              : "w-smallerPage h-smallerPage"
                          }`}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                {/* DISPLAY THE PANELS */}
                {objectList.map((obj) => (
                  <Draggable
                    styles={{
                      position: "absolute",
                      left: `${obj.position.x}px`,
                      top: `${obj.position.y}px`,
                    }}
                    id={obj.id}
                    key={obj.id}
                  >
                    {obj.type === "panel" && (
                      <GeneratePanel
                        deleteFunc={() => deleteObject(obj.id)}
                        shape={obj.shape}
                        focus={obj.focus}
                      />
                    )}
                  </Draggable>
                ))}

                {/* DISPLAY THE SPEECH BUBBLES */}
                {objectList.map((obj) => (
                  <Draggable
                    styles={{
                      position: "absolute",
                      left: `${obj.position.x}px`,
                      top: `${obj.position.y}px`,
                    }}
                    id={obj.id}
                    key={obj.id}
                  >
                    {obj.type === "speech" && (
                      <GenerateTextBubble
                        deleteFunc={() => deleteObject(obj.id)}
                        shape={obj.shape}
                        focus={obj.focus}
                      />
                    )}
                  </Draggable>
                ))}
              </div>
            </Droppable>
          </div>
        </div>
      </DndContext>
    </MainLayout>
  );
}

export default CreateComicPage;
