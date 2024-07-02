import React, { useState, useEffect } from "react";
import styles from "./Settings.module.css";

// API Functions
import { UpdateUserDetails, getUserDetails } from "../../api/UserAuth";

// Components
import Input from "../../components/Input/Input";

// Icons
import { CiLock, CiMail, CiUser } from "react-icons/ci";
import { promiseToast, showToast } from "../../components/Toast/Toast";

function Setting() {
  const [value, setValue] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const fetchUserDetails = () => {
      try {
        const userDetails = getUserDetails()
          .then((response) => {
            setValue({
              name: response.data.name,
              email: response.data.email,
              oldPassword: "",
              newPassword: "",
            });

            return response;
          })
          .catch((error) => {
            throw error;
          });

        promiseToast(userDetails, {
          pending: "Fetching User Details",
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdateClick = () => {
    if (value.oldPassword === value.newPassword) {
      showToast("Please enter your new password", "error");
      return;
    }

    try {
      const response = UpdateUserDetails(
        value.name,
        value.email,
        value.oldPassword,
        value.newPassword
      )
        .then((response) => {
          console.log(response);
          showToast("User Details Updated Successfully", "success");
          return response;
        })
        .catch((error) => {
          throw error;
        });

      promiseToast(response, {
        pending: "Updating User Details",
      });
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  console.log(value);

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.settingsHeadingContainer}>
          <span>Settings</span>
        </div>
        <div className={styles.settingsFieldsContainer}>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            icon={<CiUser />}
            value={value.name}
            onChange={handleChange}
            readonly={true}
          />
          <Input
            type="text"
            name="email"
            placeholder="Email"
            icon={<CiMail />}
            value={value.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            icon={<CiLock />}
            value={value.oldPassword}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="newPassword"
            placeholder="New Password"
            icon={<CiLock />}
            value={value.newPassword}
            onChange={handleChange}
          />
          <button className={styles.updateButton} onClick={handleUpdateClick}>
            Update
          </button>
        </div>
      </div>
    </>
  );
}

export default Setting;
