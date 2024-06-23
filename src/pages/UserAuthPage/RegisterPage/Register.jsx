import React, { useState } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";

// API functions
import { RegisterUser } from "../../../api/UserAuth";

// Components
import { promiseToast } from "../../../components/Toast/Toast";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

// Icons
import { CiLock, CiMail, CiUser } from "react-icons/ci";

function Register() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({ ...prevState, [name]: value }));
    setError((prevState) => ({ ...prevState, [name]: "" }));
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!value.name) newErrors.name = "Please, enter a name";
    if (!value.email) newErrors.email = "Please, enter an email";
    if (!value.password) newErrors.password = "Please, enter a password";
    if (!value.confirmPassword)
      newErrors.confirmPassword = "Please, enter a confirm password";
    if (value.confirmPassword !== value.password) {
      newErrors.confirmPassword = "Password doesn't match";
    }
    return newErrors;
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    const newErrors = validateInputs();
    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      await handleUserRegistration();
    }
  };

  const handleUserRegistration = async () => {
    const { name, email, password } = value;

    const registerUserPromise = RegisterUser(name, email, password)
      .then((response) => {
        navigate("/login");
        return response.message;
      })
      .catch((error) => {
        throw error;
      });

    promiseToast(registerUserPromise, {
      pending: "Please wait while registering user...",
      success: "User Registered Successfully",
    });
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headingContainer}>
        <span className={styles.heading}>Register</span>
      </div>
      <div className={styles.inputContainer}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          icon={<CiUser />}
          onChange={handleChange}
          value={value.name}
        />
        <p className={error.name ? styles.errorMessage : ""}>{error.name}</p>

        <Input
          type="text"
          name="email"
          placeholder="Email"
          icon={<CiMail />}
          onChange={handleChange}
          value={value.email}
        />
        <p className={error.email ? styles.errorMessage : ""}>{error.email}</p>

        <Input
          type="password"
          name="password"
          placeholder="Password"
          icon={<CiLock />}
          onChange={handleChange}
          value={value.password}
        />
        <p className={error.password ? styles.errorMessage : ""}>
          {error.password}
        </p>

        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          icon={<CiLock />}
          onChange={handleChange}
          value={value.confirmPassword}
        />
        <p className={error.confirmPassword ? styles.errorMessage : ""}>
          {error.confirmPassword}
        </p>
      </div>
      <div className={styles.buttonsContainer}>
        <Button name="Register" type="primary" onClick={handleRegisterClick} />
        <p>Have an account?</p>
        <Button name="Log in" type="secondary" onClick={handleLoginClick} />
      </div>
    </div>
  );
}

export default Register;
