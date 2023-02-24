import { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import GeneratePanel from "./GeneratePanel";
import "./CreateComicPage.css";
import styles from "../../assets/style";

function CreateComicPage() {
  const [panelList, setPanelList] = useState([]);

  const onAddBtnClick = (event) => {
    const newList = [...panelList]
    console.log(newList.length);
    setPanelList(newList.concat(<GeneratePanel deleteFunc={deletePanel} index={newList.length} />));
  }; 

  const deletePanel = (i) => {
    console.log(i)

    const deleteP = [...panelList]
    console.log(deleteP)
    deleteP.filter((x, index) => index !== i);
    // deleteP.splice(0,1)
    setPanelList(deleteP);
  };

  useEffect(() => {

  }, []);
  
  return (
    <MainLayout footer="noFooter">
      <div className="bg-gray-200 relative h-[calc(100vh-56px)] overflow-hidden flex">
        <div
          className={`sidebar bg-gray-600 text-blue-100 w-16 space-y-6 py-7 px-2 inset-y-0 left-0 relative ${styles.flexStart} `}
        >
          <div>
            <button
              onClick={onAddBtnClick}
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
            
           
            {panelList.map((Comp, index)=>(
              <div className="absolute z-10" key={index}>
                 {Comp}
              </div>
            ))}

          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CreateComicPage;
