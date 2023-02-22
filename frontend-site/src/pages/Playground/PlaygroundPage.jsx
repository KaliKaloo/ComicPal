import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import SecondaryButton from "../../components/ui/SecondaryButton";
import playgroundComic from "../../assets/playgroundComic.png";
import playgroundStory from "../../assets/playgroundStory.png";
import playgroundCharacter from "../../assets/playgroundCharacter.png";

function PlaygroundPage() {
  return (
    <MainLayout>
      <div className="w-full py-[6rem] px-4 ">
        <div
          className={`max-w-[1240px] mx-auto grid lg:grid-cols-3 md:grid-cols-2 md:px-4 px-14 gap-8 font-poppins`}
        >
          <Link to="/CreateStory">
          <div className="w-full bg-paleYellow shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <img
              src={playgroundStory}
              className="mt-8 h-64 w-[200px] mx-auto border-solid border-2 border-darkGreen"
            />
            <h2 className="text-2xl font-bold text-center text-darkGreen p-4">
              Develop A Story
            </h2>
            <SecondaryButton
              styles="mb-8 mx-auto bg-lightGreen outline-none text-white w-[200px]"
              text="Lets Go!"
            />
          </div>
          </Link>

          <Link to="/CreateComicPage">
          <div className="w-full bg-paleYellow shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <img
              src={playgroundComic}
              className="mt-8 h-64 w-[200px] mx-auto border-solid border-2 border-darkGreen"
            />
            <h2 className="text-2xl font-bold text-center text-darkGreen p-4">
              Create A Comic Page
            </h2>
            <SecondaryButton
              styles="mb-8 mx-auto bg-lightGreen outline-none text-white w-[200px]"
              text="Lets Go!"
            />
          </div>
          </Link>

          <Link to="/CreateCharacter">
          <div className="w-full bg-paleYellow shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <img
              src={playgroundCharacter}
              className="mt-8 h-64 w-[200px] mx-auto border-solid border-2 border-darkGreen"
            />
            <h2 className="text-2xl font-bold text-center text-darkGreen p-4">
              Design A Character
            </h2>
            <SecondaryButton
              styles="mb-8 mx-auto bg-lightGreen outline-none text-white w-[200px]"
              text="Lets Go!"
            />
          </div>
          </Link>

        </div>
      </div>
    </MainLayout>
  );
}

export default PlaygroundPage;
