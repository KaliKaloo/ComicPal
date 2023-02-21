import React from "react";
import overviewImg1 from "../../assets/overviewImg1.png"
import overviewImg2 from "../../assets/overviewImg2.png"
import styles, { layout } from "../../assets/style";
import MainButton from "../../components/ui/MainButton";



function Info() {
  return (
    // <div className="flex flex-row">
    <div className="grid xl:grid-cols-2 gap-4">
      <section className={layout.sectionReverse}>
          <div className={layout.sectionImgReverse}>
            <img src={overviewImg1} alt="overview img 1" className="object-cover w-[100%] h-[100%] relative z-[5]"/>
          </div>
          
          <div className={`${layout.sectionInfo} pr-16 mt-10`}>
            <h2 className={`${styles.heading2} w-[300px]`}>
            Your Wingman,
              <br className="sm:block hidden" /> for Creative Leadership!
            </h2>
            <p className={`${styles.paragraphDark} max-w-[300px]`}>
              AI technology has revolutionized the creative space, but some artists
              still view it as a taboo. Fear not, because ComicPal is not here to
              replace your creative vision. Instead, think of it as a virtual
              assistant to elevate your artistry to new heights. With just the right
              amount of AI assistance, ComicPal is here to help unleash your
              creativity and enhance your productivity!
            </p>
            
            <div className="w-[300px]">
              <MainButton styles="mt-6 mb-10 bg-blue-gradient" text="Get Started" />
            </div>
          </div>
        
      </section>
      <div>
          <img src={overviewImg2} alt="overview img 2" className="w-[100%] h-[100%] relative z-[5] object-cover" />
        </div>
    </div>
  );
}

export default Info;
