import React from 'react'
import MainLayout from "../../layout/MainLayout";
import styles from "../../assets/style";

const OverviewPage = () => {
  return (
    <MainLayout>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}> 
          navbar?
        </div>
      </div>

      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          Hero section
        </div>
      </div>

      <div className={`${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          Info about website
          Why
          How to uses
          Footer
        </div>
      </div>
    </MainLayout>
  )
}

export default OverviewPage