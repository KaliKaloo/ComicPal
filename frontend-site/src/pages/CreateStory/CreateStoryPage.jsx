import { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import "./CreateStoryPage.css";
import openaiLogo from "../../assets/openai-logo.svg";

function CreateStoryPage() {
  const [input, setInput] = useState("");
  const [storyLog, setStoryLog] = useState([
  ]);

  function clearStory(){
    setStoryLog([])
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let newStoryLog = [...storyLog, {user:"me", message: `${input}`}];
    setInput("");
    setStoryLog(newStoryLog)

    const messages = newStoryLog.map((message) => message.message).join("")

    const response = await fetch("http://localhost:3080/story",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        message: messages
      })
    });
    const data = await response.json();
    setStoryLog([...newStoryLog, {user:"openai", message:`${data.message}`}])
  }

  return (
    <MainLayout>
      <div className="createStoryPageLayout">
        <aside className="sideMenu">
          <div className="side-menu-button" onClick={clearStory}>
            <span>+</span>
            New Chat
          </div>
        </aside>

        <section className="storyBox">
          <div className="story-log">
            {storyLog.map((message, index) => (
              <StoryMessage key={index} message={message}/>
            ))}
          </div>
          <div className="story-input-holder">
            <form onSubmit={handleSubmit}>
              <input 
              rows="1" 
              value={input}
              onChange={(e)=> setInput(e.target.value)}
              className="story-input-textarea"></input>
            </form>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

const StoryMessage = ({message}) => {
  return(
    <div className={'story-message ${message.user === "openapi" && "openapi"}'}>
      <div className="story-message-center">
        <div className={`avatar ${message.user === "openapi" && "openapi"}`}>
          {/* display svg */}
          {message.user === "openapi" && <img
                    src={openaiLogo}
                    alt="openai avatar"
                    width={30}
                    height={30}
                  />}
        </div>
        <div className="message">
          {message.message}
        </div>
      </div>
    </div>
  )
}

export default CreateStoryPage;
