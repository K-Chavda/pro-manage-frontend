import React, { useState } from "react";
import styles from "./NavigationBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";

// Component
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

// Icons
import {
  logoIcon,
  databaseIcon,
  layoutIcon,
  settingsIcon,
  logoutIcon,
} from "../../assets/icons/index";

function NavigationBar() {
  const navigate = useNavigate();
  const [isModelOpen, setIsModelOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsModelOpen(true);
  };

  const logoutUser = () => {
    localStorage.clear();
    navigate("/");
  };

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
            <div className={styles.logout}>
              <span className={styles.logoutIcon}>
                <img src={logoutIcon} alt="pro-manage" />
              </span>
              <span className={styles.logoutText} onClick={handleLogoutClick}>
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        message="Are you sure you want to Logout?"
        confirmButton="Yes, Logout"
        closeButton="Cancel"
        callBack={logoutUser}
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
      />
    </>
  );
}

export default NavigationBar;
