import React from "react";
import MainLayout from "../../layout/MainLayout";
import "./CreateStoryPage.css";
import openaiLogo from "../../assets/openai-logo.svg";

function CreateStoryPage() {
  return (
    <MainLayout>
      <div className="createStoryPageLayout"> 
        <aside className="sideMenu">
          <div className="side-menu-button">
            <span>+</span>
            New Chat
          </div>
        </aside>
        
        <section className="storyBox">
          <div className="story-log">
            <div className="story-message ">
              <div className="story-message-center">
                <div className="avatar">
                  
                </div>
                <div className="message">
                  Hello world
                </div>
              </div> 
            </div>
            <div className="story-message openai">
              <div className="story-message-center">
                <div className="avatar openai">
                  <img src={openaiLogo} alt="openai avatar" width={30} height={30}/>
                </div>
                <div className="message">
                  I am an AI
                </div>
              </div> 
            </div>
          </div>
          <div className="story-input-holder">
            <input 
            rows="1"
            className="story-input-textarea"></input>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default CreateStoryPage;
