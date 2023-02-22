import { useState } from "react";
import "./CreateComicPage.css";
import MainButton from "../../components/ui/MainButton";
import SecondaryButton from "../../components/ui/SecondaryButton";

function GeneratePanel() {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState("");

  const generateImage = async(e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3080/image",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        prompt: prompt,
      })
    });
    const res = await response.json();
    setImageURL(res.url);
  }

  return (
    <div>
      <div className=" bg-white flex flex-col items-center border-solid border-2 border-black p-10 m-20 w-[400px] hover:scale-105 duration-300">
        <input
          className="text-center font-poppins"
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type a prompt..."
        />
        <SecondaryButton styles="my-6 outline outline-2 outline-lightGreen" onClick={generateImage} text="Generate" />

        {imageURL.length > 0 ? (
          <img src={imageURL} alt="" className="result-image"></img>
        ) : (
          <></>
        )}  
      </div>
    </div>
  );
}

export default GeneratePanel;
