import React from "react";
import MainLayout from "../../layout/MainLayout";
import styles from "../../assets/style";
import {HeroSection, Info, HowToUse, GetStarted, Testimonials, Feedback,} from ".";

const OverviewPage = () => {
  return (
    <MainLayout>
      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <HeroSection/>
        </div>
      </div>

      <div className={`bg-paleYellow  ${styles.flexCenter}`}>
        <div className={`xl:max-w-[1580px] w-full`}>
          <Info/>
          <HowToUse/>
          <Testimonials/>
          <Feedback/>
        </div>
      </div>
    </MainLayout>
  );
};

export default OverviewPage;
