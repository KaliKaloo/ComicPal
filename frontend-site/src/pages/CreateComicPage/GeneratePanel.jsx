import { useState } from "react";
import "./CreateComicPage.css";

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
      <div className="image-panel">
        <input
          className="image-input"
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type something to Generate an Image"
        />
        <button onClick={generateImage}>Generate an Image</button>

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
