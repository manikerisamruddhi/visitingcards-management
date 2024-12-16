// import React, { useState } from "react";
// import styles from "./Login.module.css"; // Import styles for the component
// import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

// const Login: React.FC = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const dataToSend = {
//       username: formData.username,
//       password: formData.password,
//     };

//     try {
//       const response = await fetch("http://localhost:3000/api/auth/log-in", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(dataToSend),
//       });

//       if (response.ok) {
//         const responseData = await response.json();
//         console.log("Login successful", responseData);

//         // Store userId in localStorage for future requests
//         localStorage.setItem("userId", responseData.userId);
//         alert("Login successful! Welcome back!");

//         // Redirect to dashboard after successful login
//         navigate("/dashboard");
//       } else {
//         const errorData = await response.json();
//         alert(`Error: ${errorData.error || "Invalid credentials"}`);
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert("An unexpected error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <form onSubmit={handleSubmit} className={styles.formContainer}>
//         <div className={styles.formHeader}>Login to Your Account</div>

//         <div className={styles.formField}>
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             className={styles.inputField}
//           />
//         </div>

//         <div className={styles.formField}>
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className={styles.inputField}
//           />
//         </div>

//         <button type="submit" className={styles.submitButton}>
//           Log In
//         </button>
//         <br />
//         <span>Don't have an account? </span>
//         <Link to="/signup" className={styles.signupLink}>
//           Sign Up
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import styles from "./Login.module.css"; // Import styles for the component
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

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
      password: formData.password,
    };

    try {
      const response = await fetch("http://localhost:3000/api/auth/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Login successful", responseData);

        // After receiving the token, make another request to get user details
        const userDetailsResponse = await fetch("http://localhost:3000/api/auth/getUser", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${responseData.token}`, // Include the token in the request header
          },
        });

        if (userDetailsResponse.ok) {
          const userDetails = await userDetailsResponse.json();
          console.log("User details:", userDetails);

          // Navigate to Dashboard and pass user details
          navigate("/dashboard", { state: { userId: userDetails.id, username: userDetails.username } });
        } else {
          const errorData = await userDetailsResponse.json();
          alert(`Error: ${errorData.error || "Unable to fetch user details"}`);
        }

      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.formHeader}>Login to Your Account</div>

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
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Log In
        </button>
        <br />
        <span>Don't have an account? </span>
        <Link to="/signup" className={styles.signupLink}>
          Sign Up
        </Link>
      </form>
    </div>
  );
};

export default Login;
