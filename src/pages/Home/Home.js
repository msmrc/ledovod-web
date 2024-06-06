import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.imageContainer}>
        <img
          className={styles.mainImage}
          src="images/welcome.png"
          alt="Placeholder"
        />
        <div className={`${styles.feature} ${styles.feature1}`}>Фича 1</div>
        <div className={`${styles.feature} ${styles.feature2}`}>Фича 2</div>
        <div className={`${styles.feature} ${styles.feature3}`}>Фича 3</div>
      </div>
      <div className={styles.contentContainer}>
        <img
          className={styles.logo}
          src="images/logo.png"
          alt="Logo Placeholder"
        />
        <div className={styles.mainText}>
          Ледовод - инновационный сервис для планирования и заказа проведения
          кораблей через северный морской путь
        </div>
        <Link to="/dashboard" className={styles.buttonLink}>
          <div className={styles.buttonBox}>
            <div className={styles.buttonText}>Войти</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
