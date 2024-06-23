import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

// API functions
import { LoginUser } from "../../../api/UserAuth";

// Components
import { promiseToast } from "../../../components/Toast/Toast";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";

// Icons
import { CiLock, CiMail } from "react-icons/ci";

function Login() {
  const navigate = useNavigate();
  const [value, setValue] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({ ...prevState, [name]: value }));
    setError((prevState) => ({ ...prevState, [name]: "" }));
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!value.email) newErrors.email = "Please, enter an email";
    if (!value.password) newErrors.password = "Please, enter a password";
    return newErrors;
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    const newErrors = validateInputs();
    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      await handleUserLogin();
    }
  };

  const handleUserLogin = async () => {
    const { email, password } = value;

    if (!email || !password) return;

    const loginUserPromise = LoginUser(email, password)
      .then((response) => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("email", response.userDetails.email);
        localStorage.setItem("name", response.userDetails.name);
        navigate("/dashboard");
        return response;
      })
      .catch((error) => {
        throw error;
      });

    promiseToast(loginUserPromise, {
      pending: "Please wait while logging you in...",
      success: "Welcome to Pro Manage",
    });
  };

  const handleSignUpClick = () => {
    navigate("/register");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headingContainer}>
        <span className={styles.heading}>Login</span>
      </div>
      <div className={styles.inputContainer}>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          icon={<CiMail />}
          onChange={handleChange}
        />
        <p className={error.email ? styles.errorMessage : ""}>{error.email}</p>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          icon={<CiLock />}
        />
        <p className={error.password ? styles.errorMessage : ""}>
          {error.password}
        </p>
      </div>
      <div className={styles.buttonsContainer}>
        <Button name="Log in" type="primary" onClick={handleLoginClick} />
        <p>Have no account yet?</p>
        <Button name="Register" type="secondary" onClick={handleSignUpClick} />
      </div>
    </div>
  );
}

export default Login;
