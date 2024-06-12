import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.textWrapper}>
          <div className={styles.text}>
            Ледовод — инновационный сервис для планирования и заказа проведения
            кораблей через северный морской путь
          </div>
          <Link to="/dashboard/requests" className={styles.buttonContainer}>
            <div className={styles.buttonText}>Войти в аккаунт</div>
          </Link>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src="/images/welcome_ship.png"
          alt="Placeholder"
        />
      </div>
    </div>
  );
};

export default Home;
