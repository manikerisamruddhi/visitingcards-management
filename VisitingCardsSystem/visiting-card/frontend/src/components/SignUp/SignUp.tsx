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
      const response = await fetch("api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
  
      const responseData = await response.json();
      console.log({responseData})
      //navigate("/dashboard"); // Redirect to dashboard
      if (response.ok) {
        console.log("Signup successful", responseData);
        localStorage.setItem("userId", responseData.user._id); // Storing user ID correctly
        navigate("/dashboard", { state: { userId: responseData.user._id, username: responseData.user.username } });
        
      } else {
        alert(`Error: ${responseData.error || "An error occurred"}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred while signing up. Please try again.");
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
