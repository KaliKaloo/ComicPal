import React from "react";
import MainLayout from "../../layout/MainLayout";
import styles from "../../assets/style";
import {HeroSection, Info, HowToUse, } from ".";

const OverviewPage = () => {
  return (
    <MainLayout>
      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <HeroSection/>
        </div>
      </div>

      <div className={`bg-paleYellow  ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth2}`}>
          <Info/>
          <HowToUse/>
        </div>
      </div>
    </MainLayout>
  );
};

export default OverviewPage;
