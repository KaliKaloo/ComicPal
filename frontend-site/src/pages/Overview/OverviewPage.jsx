import React from "react";
import MainLayout from "../../layout/MainLayout";
import styles from "../../assets/style";
import {HeroSection, Info, HowToUse, GetStarted, Testimonials, Feedback,} from ".";

const OverviewPage = () => {
  return (
    <MainLayout>
      {/* <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>navbar?</div>
      </div> */}

      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <HeroSection/>
        </div>
      </div>

      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <HowToUse/>
          <Info/>
          <GetStarted/>
          <Testimonials/>
          <Feedback/>
        </div>
      </div>
    </MainLayout>
  );
};

export default OverviewPage;
