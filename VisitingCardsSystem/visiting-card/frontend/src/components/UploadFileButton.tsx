// import React, { useState } from "react";
// import styles from "./Upload.module.css"; // Import styles for the component

// const UploadFileButton: React.FC<{ onFileSelect: (fileUrl: string | null) => void, userId: string }> = ({ onFileSelect, userId }) => {
//   const preset_key = "visiting-card"; // Cloudinary upload preset
//   const cloud_name = "dump4bxcm"; // Your Cloudinary cloud name
//   const [image, setImage] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false); // To manage loading state
//   const [error, setError] = useState<string | null>(null);  // To handle any error during upload

//   const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     console.log("image success");
    
//     const file = e.target.files?.[0];
//     if (!file) {
//       console.log("No file selected");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", preset_key);

//     // Set loading state
//     setLoading(true);
//     setError(null);  // Reset error on new file selection

//     try {
//       const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) {
//         throw new Error("Failed to upload image");
//       }

//       const data = await res.json();
//       setImage(data.secure_url); // Save uploaded image URL
//       setLoading(false);  // Reset loading state
//       onFileSelect(data.secure_url); // Pass the image URL to parent component

//       // Send image URL and userId to backend for OCR extraction and data saving
//       const cardData = {
//         user: userId, // User ID
//         cardImage: data.secure_url, // Card Image URL from Cloudinary
//         cardName: "Sample Card", // Optional: Set card name if needed
//       };

//       const response = await fetch("http://localhost:3000/api/user/upload", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(cardData),
//       });

//       if (response.ok) {
        
//         throw new Error("Error uploading card data");
//       } else {
        
//       }

//       const result = await response.json();
//       console.log("Card saved:", result);
//     } catch (err) {
//       setError("Upload failed. Please try again later.");
//       setLoading(false);  // Reset loading state
//       console.error("Error: ", err);
//     }
//   };

//   return (
//     <div className={styles.uploadContainer}>
//       <label htmlFor="file-upload" className={styles.fileUploadButton}>
//         {loading ? "Uploading..." : "Upload Image"}
//       </label>
//       <input
//         id="file-upload"
//         type="file"
//         name="image"
//         onChange={handleFile}
//         style={{ display: "none" }} // Hide the default file input field
//       />

//       {image && (
//         <div className={styles.imagePreview}>
//           <img src={image} alt="Uploaded Preview" className={styles.previewImage} />
//         </div>
//       )}

//       {error && <p className={styles.error}>{error}</p>}
//     </div>
//   );
// };

// export default UploadFileButton;

import React, { useState } from "react";
import styles from "./Upload.module.css";
import { useUser } from "./UserContex"; // If you still need to use this context

type UploadFileButtonProps = {
  userId: string; // userId is required now
  onFileSelect: (fileUrl: string | null) => void;
};

const UploadFileButton: React.FC<UploadFileButtonProps> = ({ userId, onFileSelect }) => {
  const preset_key = "visiting-card";
  const cloud_name = "dump4bxcm";
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      if (!userId) {
        throw new Error("User is not logged in. Please log in to upload a visiting card.");
      }

      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset_key);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload image");

      const data = await res.json();
      const fileUrl = data.secure_url;

      setImage(fileUrl);
      onFileSelect(fileUrl);  // Call onFileSelect to send file URL to the parent

      // Send card data to backend
      const cardData = { user: userId, cardImage: fileUrl, cardName: "Default Name" };

      const response = await fetch("http://localhost:3000/api/user/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save card data");
      }

      console.log("Card saved:", await response.json());
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <label htmlFor="file-upload" className={styles.fileUploadButton}>
        {loading ? "Uploading..." : "Upload Image"}
      </label>
      <input
        id="file-upload"
        type="file"
        name="image"
        onChange={handleFile}
        style={{ display: "none" }}
      />
      {image && <img src={image} alt="Uploaded Preview" className={styles.previewImage} />}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default UploadFileButton;
