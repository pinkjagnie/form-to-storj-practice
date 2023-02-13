import React from "react";

import styles from "./success.module.css";

const Success = (props) => {

  const closeSuccessHandler = () => {
    props.closeSuccessHandler()
  };

  return(
    <section className={styles.thanksSection}>
      <div className={styles.thanksBox}>
        <div className={styles.thanksWrapper}>
          <img src="https://i.ibb.co/Lkn7rkG/thank-you-envelope.png" alt="thank-you-envelope" border="0" />
          <h1 className={styles.thanksTitle}>Thank you!</h1>
          <p className={styles.thanksText}>Your file has been send to our amazing database</p> 
          <button className={styles.goBackButton} onClick={closeSuccessHandler}>Go back</button>
        </div>
      </div>
    </section>
  )
};

export default Success;