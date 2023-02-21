import { apple, bill, google } from "../../assetsTemp"
import styles, {layout} from "../../assets/style"
import overviewImg3 from "../../assets/overviewImg3.png"
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
    <section id="howtouse" className={`${layout.sectionReverse} sm:pb-16`}>
    <div className={layout.sectionImgReverse}>
      <img src={overviewImg3} alt="billing" className="w-[100%] h-[100%] relative z-[5] object-cover" />

      {/* gradient start */}
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      {/* gradient end */}
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
  )
}

export default HowToUse