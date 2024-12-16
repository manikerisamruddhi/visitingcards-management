import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import styles from "./SignUp.module.css"; // Import styles for the component

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSend = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    try {
      const response = await fetch("http://localhost:3000/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Signup successful", responseData);

        // Store userId in localStorage for future requests
        localStorage.setItem("userId", responseData.userId);
        navigate("/dashboard"); // Redirect to /dashboard route
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "An error occurred"}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formHeader}>Create Your Account</div>

        <div className={styles.formField}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>

        <div className={styles.formField}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>

        <div className={styles.formField}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>

        <div className={styles.formField}>
          <input
            type="text"
            name="role"
            placeholder="Role (e.g., User, Admin)"
            value={formData.role}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>

        <br />
        <button type="submit" className={styles.submitButton}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
