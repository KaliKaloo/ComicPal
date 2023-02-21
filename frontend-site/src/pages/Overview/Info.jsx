import React from "react";
import { features } from "../../constants";
import styles, { layout } from "../../assets/style";
import MainButton from "../../components/ui/MainButton";

function FeatureCard({ icon, title, content, index }) {
  return (
    <div
      className={`flex flex-row p-6 rounded-[20px] ${
        index !== features.length - 1 ? "mb-6" : "mb-0"
      } feature-card`}
    >
      <div
        className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
      >
        <img src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
      </div>
      <div className="flex-1 flex flex-col ml-3">
        <h4 className="font-poppins font-semibold text-darkGreen text-[18px] leading-[23.4px] mb-1">
          {title}
        </h4>
        <p className="font-poppins font-normal text-darkGreen text-[16px] leading-[24px]">
          {content}
        </p>
      </div>
    </div>
  );
}

function Info() {
  return (
    <section id="features" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
        Your Wingman,
          <br className="sm:block hidden" /> for Creative Leadership!
        </h2>
        <p className={`${styles.paragraphDark} max-w-[470px] mt-5`}>
          AI technology has revolutionized the creative space, but some artists
          still view it as a taboo. Fear not, because ComicPal is not here to
          replace your creative vision. Instead, think of it as a virtual
          assistant to elevate your artistry to new heights. With just the right
          amount of AI assistance, ComicPal is here to help unleash your
          creativity and enhance your productivity, making your creative journey
          even more exciting and fulfilling. Join the AI revolution with
          ComicPal and unlock your true artistic potential!
        </p>

        <MainButton styles="mt-10 bg-blue-gradient" text="Get Started" />
      </div>

      <div className={`${layout.sectionImg} flex-col`}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
}

export default Info;
