import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";
import Navbar from "./components/Navbar";
import MainLayout from "./layout/MainLayout";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState("");
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  // initialising the openai api
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    const res = await openai.createImage({
      prompt: prompt,
      n: 1, // number of images to generate
      size: "1024x1024",
    });
    setImageURL(res.data.data[0].url);
  };

  return (
    <MainLayout>
      <div className="image-main">
        <h3>Generate an Image using OpenAI API</h3>
        <input
          className="image-input"
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type something to Generate an Image"
        />
        <button onClick={generateImage}>Generate an Image</button>

        {imageURL.length > 0 ? (
          <img src={imageURL} alt="" className="result"></img>
        ) : (
          <></>
        )}
      </div>
    </MainLayout>
  );
}

export default App;
