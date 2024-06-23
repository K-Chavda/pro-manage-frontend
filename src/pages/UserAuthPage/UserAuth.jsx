import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import styles from "./UserAuth.module.css";
import Login from "./LoginPage/Login";
import Register from "./RegisterPage/Register";

// Images
import Art from "../../assets/images/Art.png";

function UserAuth() {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.heroContainer}>
          <div className={styles.heroImageContainer}>
            <img src={Art} alt="pro-manage" />
          </div>
          <div className={styles.heroTextContainer}>
            <div className={styles.heroText}>
              <span className={styles.heroTitle}>Welcome aboard my friend</span>
              <span className={styles.heroSubTitle}>
                just a couple of clicks and we start
              </span>
            </div>
          </div>
        </div>
        <div className={styles.contentContainer}>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default UserAuth;
