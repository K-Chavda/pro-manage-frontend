import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";

// API Functions
import { getAnalytics } from "../../api/Task";

// Constants
import { PRIORITY, TAST_STATUS } from "../../utils/constants";

// Component
import { promiseToast } from "../../components/Toast/Toast";

function Analytics() {
  const [analyticsData, setAnalyticsData] = useState({});

  const getAnalyticsData = () => {
    try {
      const response = getAnalytics()
        .then((response) => {
          setAnalyticsData(response);
          return;
        })
        .catch((error) => {
          throw error;
        });

      promiseToast(response, { pending: "Loading..." });
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  useEffect(() => {
    getAnalyticsData();
  }, []);

  const toCamelCase = (text) => {
    const words = text.split(/[\s_]+/);

    const camelCaseText = words
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join("");

    return camelCaseText;
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.analyticsContainer}>
          <span>Analytics</span>
        </div>
        <div className={styles.analyticsDetailsContainer}>
          <div className={styles.analyticsDetail}>
            {TAST_STATUS &&
              TAST_STATUS.map((status) => (
                <div
                  className={styles.analyticsDetailRecordsContainer}
                  key={status}
                >
                  <div className={styles.analyticsTitleContainer}>
                    <span className={styles.analyticsIconSpan}></span>
                    <span className={styles.analyticsTextSpan}>
                      {status} Tasks
                    </span>
                  </div>
                  <div className={styles.analyticsCountContainer}>
                    <span className={styles.analyticsCountSpan}>
                      {analyticsData[`${toCamelCase(status)}TasksCount`]}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <div className={styles.analyticsDetail}>
            {PRIORITY &&
              PRIORITY.map((priority) => (
                <div
                  className={styles.analyticsDetailRecordsContainer}
                  key={priority}
                >
                  <div className={styles.analyticsTitleContainer}>
                    <span className={styles.analyticsIconSpan}></span>
                    <span className={styles.analyticsTextSpan}>
                      {priority.toLowerCase()} Tasks
                    </span>
                  </div>
                  <div className={styles.analyticsCountContainer}>
                    <span className={styles.analyticsCountSpan}>
                      {analyticsData[`${priority.toLowerCase()}PriorityTasks`]}
                    </span>
                  </div>
                </div>
              ))}
            <div className={styles.analyticsDetailRecordsContainer}>
              <div className={styles.analyticsTitleContainer}>
                <span className={styles.analyticsIconSpan}></span>
                <span className={styles.analyticsTextSpan}>Due Date Tasks</span>
              </div>
              <div className={styles.analyticsCountContainer}>
                <span className={styles.analyticsCountSpan}>
                  {analyticsData.dueDatedTasks}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
