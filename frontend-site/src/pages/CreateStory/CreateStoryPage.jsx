import React from "react";
import MainLayout from "../../layout/MainLayout";
import "./CreateStoryPage.css";

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
          create a story
          <div className="story-input-holder">
            <textarea 
            rows="1"
            className="story-input-textarea"
            placeholder="Type your text here" ></textarea>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default CreateStoryPage;
