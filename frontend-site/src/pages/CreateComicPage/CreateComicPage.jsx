import { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import GeneratePanel from "./GeneratePanel";
import styles from "../../assets/style";
import {
  DndContext,
  closestCenter,
  useSensors,
  useSensor,
  PointerSensor,
} from "@dnd-kit/core";
import { Draggable } from "../../components/ui/Draggable";
import { Droppable } from "../../components/ui/Droppable";
import {
  SquaresPlusIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";

function CreateComicPage() {
  const [panelList, setPanels] = useState([]);
  const [count, setCount] = useState(1);

  const addPanel = () => {
    setPanels([...panelList, { id: count, position: { x: 0, y: 0 } }]);
    setCount(count + 1);
  };

  const deletePanel = (id) => {
    setPanels(panelList.filter((panel) => panel.id !== id));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance:8
      },
    })
  );

  function handleDragEnd(ev) {
    let panel = panelList.find((x) => x.id === ev.active.id);
    panel.position.x += ev.delta.x;
    panel.position.y += ev.delta.y;
    console.log("clicked on " + ev.delta.x);

    const _panelList = panelList.map((x) => {
      if (x.id === panel.id) {
        console.log(panel.position);
        return panel;
      }
      return x;
    });
    setPanels(_panelList);
  }

  return (
    <MainLayout footer="noFooter">
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <Droppable>
          <div className="bg-[#f0efeb] relative h-[calc(100vh-56px)] overflow-hidden flex items-center">
            <div
              className={`z-20 flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg  fixed top-2/4 -translate-y-2/4 left-3 min-h-[auto] lg:min-w-[64px] min-w-[40px] flex-col rounded-lg border`}
            >
              <div>
                <SquaresPlusIcon
                  onClick={addPanel}
                  className="flex aspect-square min-h-[32px] lg:w-16 w-10 flex-col items-center justify-center gap-1 rounded-md p-1.5 md:p-3 text-gray-700 hover:bg-gray-100 "
                />

                <ChatBubbleBottomCenterIcon
                  onClick={addPanel}
                  className="flex aspect-square min-h-[32px] lg:w-16 w-10 flex-col items-center justify-center gap-1 rounded-md p-1.5 md:p-3 text-gray-700 hover:bg-gray-100 "
                >
                  Speech
                </ChatBubbleBottomCenterIcon>
              </div>
            </div>
            <div
              className={`flex justify-center flex-1 md:p-12 p:0 h-[calc(100vh-56px)] overflow-y-auto`}
            >
              {/* THE COMIC PAGE */}
              <div className="relative shadow-md bg-white md:w-[210mm] w-full h-[297mm]">
                <button className="absolute top-0 right-0 mt-[-1.5em] bg-white rounded-md w-20 h-5">
                  size v
                </button>

                {panelList.map((panel) => (
                  <Draggable
                    styles={{
                      position: "absolute",
                      left: `${panel.position.x}px`,
                      top: `${panel.position.y}px`,
                    }}
                    id={panel.id}
                    key={panel.id}
                    panel={panel}
                  >
                    <div className={`absolute `}>
                      <GeneratePanel deleteFunc={() => deletePanel(panel.id)} />
                    </div>
                  </Draggable>
                ))}
              </div>
            </div>
          </div>
        </Droppable>
      </DndContext>
    </MainLayout>
  );
}

export default CreateComicPage;
