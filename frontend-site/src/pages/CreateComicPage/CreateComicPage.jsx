import { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import GeneratePanel from "./GeneratePanel";
import "./CreateComicPage.css";
import styles from "../../assets/style";

function CreateComicPage() {
  const [panelList, setPanelList] = useState([]);

  const onAddBtnClick = (event) => {
    setPanelList(panelList.concat(<GeneratePanel />));
  };

  return (
    <MainLayout footer="noFooter">
      <div className={` ${styles.flexStart} h-[calc(100vh-56px)] overflow-auto`}>
        <div className="w-full flex flex-row ">
          <div className={`flex-initial w-60 bg-gray-300 p-4 ${styles.flexStart}`}>
              <button onClick={onAddBtnClick} className="bg-lightGreen">
                Add panel
              </button>
          </div>

          <div className="flex-1 bg-gray-200 p-6 overflow-auto">
            <div className="rounded-lg bg-white w-[826px] h-[1169px] p-4">
              {panelList.map((component, index) => (
                <div key={index}>{component}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CreateComicPage;
