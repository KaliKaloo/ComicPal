import { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import "./CreateComicPage.css";
import {openai} from "./../../lib/OpenAIConfig";

function CreateComicPage() {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState("");

  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1, // number of images to generate
      size: "512x512",
    });
    setImageURL(res.data.data[0].url);
  };

  return (
    <MainLayout>
      <div>Create a comic page</div>
      <div className="image-panel">
        <h3>Generate an Image using OpenAI API</h3>
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
    </MainLayout>
  );
}

export default CreateComicPage;
