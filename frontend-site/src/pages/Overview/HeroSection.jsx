import React from "react";
import styles from "../../assets/style";
import heroImg from "../../assets/heroImg.png";
import MainButton from "../../components/ui/MainButton";
import { useNavigate } from "react-router-dom"

function HeroSection() {
  const navigate = useNavigate();
  
  return (
    <section id="home" className={`flex lg:flex-row flex-col ${styles.paddingY} space-x-10`}>
      
      <div className={`flex-1 flex ${styles.flexCenter} lg:my-0 my-10 relative mx-2`}>
        <img src={heroImg} alt="hero-img" className=" w-[80%] h-[80%] lg:w-[100%] lg:h-[100%]  relative z-[5] object-contain" />
      </div>

      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-10 px-6`}>
        {/* <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">AI</span> Tool For{" "}
            <span className="text-white">Comic</span> Creators
          </p>
        </div> */}

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[62px] text-[52px] text-white ss:leading-[80.8px] leading-[75px]">
            ComicPal<br className="sm:block hidden" />{" "}
          </h1>
        </div>
        <h1 className="font-poppins font-semibold ss:text-[58px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
           A Tool For Creatives.
        </h1>

        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        An AI assisted tool built to help creatives brainstorm comic pages, panels and characters as well as storyboard. You are the creative lead with an AI assistant!
        </p>
        <div className="flex flex-row justify-between items-center w-[470px]">
          <MainButton styles="mt-6 mb-10 bg-darkGreen text-white" text="About" onClick={() => navigate('/about')}/>
          <MainButton styles="mt-6 mb-10 bg-secondary text-white hover:bg-[#E36021]" text="Get Started" onClick={() => navigate('/playground')}/>
          <MainButton styles="mt-6 mb-10 bg-lightGreen text-white hover:bg-[#007864]" text="How To Use" onClick={() => navigate('#')}/></div>

      </div>

    </section>
  );
}

export default HeroSection;
