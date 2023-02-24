import { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import GeneratePanel from "./GeneratePanel";
import "./CreateComicPage.css";
import styles from "../../assets/style";

function CreateComicPage() {
  const [panelList, setPanels] = useState([]);
  const [count, setCount] = useState(0);

  const addPanel = () => {
    setPanels([...panelList, { id: count }]);
    setCount(count + 1);
  };

  const deletePanel = (id) => {
    setPanels(panelList.filter((panel) => panel.id !== id));
  };

  return (
    <MainLayout footer="noFooter">
      <div className="bg-gray-200 relative h-[calc(100vh-56px)] overflow-hidden flex">
        <div
          className={`sidebar bg-gray-600 text-blue-100 w-16 space-y-6 py-7 px-2 inset-y-0 left-0 relative ${styles.flexStart} `}
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
          className={`flex justify-center flex-1 md:p-10 p:0 h-[calc(100vh-56px)] overflow-y-auto z-0`}
        >
          <div className="shadow-md bg-white md:w-[210mm] w-full h-[297mm] p-4">
            {panelList.map((panel) => (
              <div className="absolute z-10" key={panel.id}>
                <GeneratePanel
                  key={panel.id}
                  deleteFunc={() => deletePanel(panel.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CreateComicPage;
