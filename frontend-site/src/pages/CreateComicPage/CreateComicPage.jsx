import { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import GeneratePanel from "./GeneratePanel";
import "./CreateComicPage.css";

function CreateComicPage() {
  const [panelList, setPanelList] = useState([]);
  
  const onAddBtnClick = event => {
    setPanelList(panelList.concat(<GeneratePanel/>));
  };

  return (
    <MainLayout>
      
      <button onClick={onAddBtnClick}>Add panel</button>
      <div className="story-log">
        {panelList.map((component, index) => (
          <div key={index}>{component}</div>
        ))}
      </div>
    </MainLayout>
  );
}

export default CreateComicPage;
