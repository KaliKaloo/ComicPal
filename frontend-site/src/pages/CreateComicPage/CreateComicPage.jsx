import { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import GeneratePanel from "./GeneratePanel";
import styles from "../../assets/style";
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

function CreateComicPage() {
  const [panelList, setPanelsList] = useState([]);
  const [count, setCount] = useState(1);
  const [speechList, setSpeechList] = useState([]);
  const [newPage, setNewPage] = useState(false);
  const [pageSize, setPageSize] = useState("a4");
  let currentObject = "";

  const addPanel = (type, shape) => {
    setPanelsList([
      ...panelList,
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

  const deletePanel = (id) => {
    setPanelsList(panelList.filter((panel) => panel.id !== id));
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
    const object = panelList.find((x) => x.id === ev.active.id);
    object.focus = "onFocus";
    const _newList = panelList.map((x) => {
      if (x.id === object.id) return object;
      return x;
    });
    setPanelsList(_newList);
  }

  function handleDragEnd(ev) {
    const object = panelList.find((x) => x.id === ev.active.id);
    object.position.x += ev.delta.x;
    object.position.y += ev.delta.y;
    object.focus = "";
    const _newList = panelList.map((x) => {
      if (x.id === object.id) return object;
      return x;
    });
    setPanelsList(_newList);
  }

  return (
    <MainLayout footer="noFooter">
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <div className="bg-[#edecea] relative h-[calc(100vh-56px)] items-center">
          <div
            className={`z-20 flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg  fixed top-2/4 -translate-y-2/4 left-3 min-h-[auto] lg:min-w-[64px] min-w-[40px] flex-col rounded-lg border`}
          >
            <div>
              <Tooltip text="Square Panel">
                <RectangleGroupIcon
                  onClick={() => addPanel("panel", "square")}
                  className="flex aspect-square min-h-[32px] lg:w-16 w-10 flex-col items-center justify-center gap-1 rounded-md p-1.5  text-gray-700 hover:bg-gray-200 "
                />
              </Tooltip>
              <Tooltip text="Round Panel">
                <PlusCircleIcon
                  onClick={() => addPanel("panel", "circle")}
                  className="flex aspect-square min-h-[32px] lg:w-16 w-10 flex-col items-center justify-center gap-1 rounded-md p-1.5  text-gray-700 hover:bg-gray-200 "
                />
              </Tooltip>
              <Tooltip text="Speech Bubble">
                <ChatBubbleOvalLeftIcon
                  onClick={() => addPanel("speech")}
                  className="flex aspect-square min-h-[32px] lg:w-16 w-10 flex-col items-center justify-center gap-1 rounded-md p-1.5  text-gray-700 hover:bg-gray-200 "
                />
              </Tooltip>
              
            </div>
          </div>

          <div
            className={`flex ${
              newPage ? "justify-start ml-20 " : "justify-center"
            } flex-1 p-12 h-full overflow-auto `}
          >
            <Droppable styles={`h-a4`}>
              {/* THE COMIC PAGES */}
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
                  className="w-40 font-poppins text-sm absolute top-0 left-0 mt-[-1.6rem] h-5 text-gray-500 text-center shadow-sm outline-none "
                >
                  <option value="a4">210 x 297</option>
                  <option value="smallerPage">174 x 264</option>
                </select>

                {!newPage ? (
                  <PlusIcon
                    onClick={() => setNewPage(true)}
                    className="absolute top-0 right-0 mt-[-1.5em] hover:bg-[#e0dfdb] rounded-full w-5 h-5"
                  />
                ) : (
                  <XMarkIcon
                    onClick={() => setNewPage(false)}
                    className="absolute top-0 right-[-2.4rem] mt-[-1.5em] hover:bg-[#e0dfdb] rounded-full w-5 h-5"
                  />
                )}

                {newPage ? (
                  <div
                    className={`absolute md:ml-[calc(w-a4+5mm)] ml-[calc(w-a4-15mm)] shadow-md bg-white ${
                      pageSize === "a4"
                        ? "w-a4 h-a4 md:ml-a42 ml-a43"
                        : "w-smallerPage h-smallerPage md:ml-smallerPage2 ml-smallerPage3 "
                    }`}
                  />
                ) : (
                  <></>
                )}

                {/* DISPLAY THE PANELS */}
                {panelList.map((panel) => (
                  <Draggable
                    styles={{
                      position: "absolute",
                      left: `${panel.position.x}px`,
                      top: `${panel.position.y}px`,
                    }}
                    id={panel.id}
                    key={panel.id}
                  >
                    {panel.type === "panel" && (
                      <GeneratePanel
                        deleteFunc={() => deletePanel(panel.id)}
                        shape={panel.shape}
                        focus={panel.focus}
                      />
                    )}
                  </Draggable>
                ))}

                {/* DISPLAY THE SPEECH BUBBLES */}
                {panelList.map((panel) => (
                  <Draggable
                    styles={{
                      position: "absolute",
                      left: `${panel.position.x}px`,
                      top: `${panel.position.y}px`,
                    }}
                    id={panel.id}
                    key={panel.id}
                  >
                    {panel.type === "speech" && (
                      <GenerateTextBubble
                        deleteFunc={() => deletePanel(panel.id)}
                        shape={panel.shape}
                        focus={panel.focus}
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
