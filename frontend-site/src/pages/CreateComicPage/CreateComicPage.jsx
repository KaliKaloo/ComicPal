import { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import GeneratePanel from "./GeneratePanel";
import styles from "../../assets/style";
import { DndContext, closestCenter, useSensors, useSensor, PointerSensor } from "@dnd-kit/core";
import { Draggable } from "../../components/ui/Draggable";
import { Droppable } from "../../components/ui/Droppable";

function CreateComicPage() {
  const [panelList, setPanels] = useState([]);
  const [count, setCount] = useState(0);

  const addPanel = () => {
    setPanels([...panelList, { id: count, position:{x:0,y:0}}]);
    setCount(count + 1);
  };

  const deletePanel = (id) => {
    setPanels(panelList.filter((panel) => panel.id !== id));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  function handleDragEnd(ev) {
    console.log("stop");
    const panel = panelList.find((x) => x.id === ev.active.id);
    panel.position.x += ev.delta.x;
    panel.position.y += ev.delta.y;
    const _panelList = panelList.map((x) => {
      if (x.id === panel.id) return panel;
      return x;
    });
    setPanels(_panelList);
  }

  return (
    <MainLayout footer="noFooter">
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <Droppable>
          <div className="bg-gray-200 relative h-[calc(100vh-56px)] overflow-hidden flex">
            <div
              className={`sidebar bg-gray-600 text-blue-100 w-16 space-y-6 py-7 px-2 inset-y-0 left-0 relative ${styles.flexStart} z-40`}
            >
              <div>
                <button
                  onClick={addPanel}
                  className="bg-lightGreen block mb-4 py-2 px-4 rounded"
                >
                  X
                </button>
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
                  >
                    <div className={`absolute top:${panel.position.y}px left:${panel.position.x}px`}>
                      <GeneratePanel  deleteFunc={() => deletePanel(panel.id)} />
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
