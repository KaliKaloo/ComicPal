import styles, { layout } from "../../assets/style";
import overviewImg3 from "../../assets/overviewImg3.png";
import { features } from "../../constants";

function FeatureCard({ icon, title, content, index }) {
  return (
    <div
      className={`flex flex-row  p-6 rounded-[20px] ${
        index !== features.length - 1 ? "mb-6" : "mb-0"
      } feature-card`}
    >
      <div
        className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
      >
        <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
      </div>
      <div className="flex-1 flex flex-col ml-3">
        <h4 className="font-poppins font-semibold text-darkGreen text-[20px] leading-[23.4px] mb-1">
          {title}
        </h4>
        <p className="font-poppins font-normal text-darkGreen text-[16px] leading-[24px]">
          {content}
        </p>
      </div>
    </div>
  );
}

function HowToUse() {
  return (
    <section id="howToUse" className={`${layout.sectionReverse} py-10 `}>
      {/* <div className="w-[100px]" /> */}
        
      <div className={`${layout.sectionImgReverse}`}>
        <img
          src={overviewImg3}
          alt="billing"
          className="h-full relative object-cover"
        />
      </div>

      {/* <div className={layout.sectionInfo}>
      <h2 className={`${styles.heading2} w-[470px]`}>
        How To Use
      </h2>
      <p className={`${styles.paragraphDark} max-w-[470px] mt-5`}>
        Elit enim sed massa etiam. Mauris eu adipiscing ultrices ametodio
        aenean neque. Fusce ipsum orci rhoncus aliporttitor integer platea
        placerat. Fusce ipsum orci rhoncus aliporttitor integer platea
        placerat.
      </p>

      
    </div> */}
      <div className={`${layout.sectionImg}  flex-col `}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
}

export default HowToUse;
