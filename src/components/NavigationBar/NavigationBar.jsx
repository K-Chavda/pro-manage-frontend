import React from "react";
import styles from "./NavigationBar.module.css";
import { NavLink } from "react-router-dom";

// Icons
import {
  logoIcon,
  databaseIcon,
  layoutIcon,
  settingsIcon,
  logoutIcon,
} from "../../assets/icons/index";

function NavigationBar() {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.navigationBar}>
          <div className={styles.logoAndNavlinkContainer}>
            <div className={styles.logoContainer}>
              <span className={styles.logoIcon}>
                <img src={logoIcon} alt="pro-manage" />
              </span>
              <span className={styles.logoText}>Pro Manage</span>
            </div>
            <div className={styles.navigationLinksContainer}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navigationLink} ${styles.selected}`
                    : styles.navigationLink
                }
                to="/dashboard"
              >
                <span className={styles.navlinkIcon}>
                  <img src={layoutIcon} alt="pro-manage" />
                </span>
                <span className={styles.logoutText}>Board</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navigationLink} ${styles.selected}`
                    : styles.navigationLink
                }
                to="/analytics"
              >
                <span className={styles.navlinkIcon}>
                  <img src={databaseIcon} alt="pro-manage" />
                </span>
                <span className={styles.logoutText}>Analytics</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navigationLink} ${styles.selected}`
                    : styles.navigationLink
                }
                to="/settings"
              >
                <span className={styles.navlinkIcon}>
                  <img src={settingsIcon} alt="pro-manage" />
                </span>
                <span className={styles.logoutText}>Settings</span>
              </NavLink>
            </div>
          </div>
          <div className={styles.logoutContainer}>
            <NavLink className={styles.logout} to="/login">
              <span className={styles.logoutIcon}>
                <img src={logoutIcon} alt="pro-manage" />
              </span>
              <span className={styles.logoutText}>Logout</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavigationBar;
