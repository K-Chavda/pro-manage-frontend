import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

// Components
import NavigationBar from "../NavigationBar/NavigationBar";

const Layout = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.navigationBarContainer}>
          <NavigationBar />
        </div>
        <div className={styles.outletContainer}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
