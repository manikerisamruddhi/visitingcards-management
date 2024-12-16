// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import styles from './Dashboard.module.css'; // Importing the CSS module
// // import UploadFileButton from '../UploadFileButton'; // Assuming this component exists

// // const Dashboard: React.FC = () => {
// //   const [userId, setUserId] = useState<string | null>(null); // State for storing userId
// //   const [selectedFile, setSelectedFile] = useState<File | null>(null); // File to be uploaded

// //   // Fetch userId (for demonstration, we use localStorage or session)
// //   useEffect(() => {
// //     const storedUserId = localStorage.getItem('userId'); // Retrieve from localStorage or session
// //     if (storedUserId) {
// //       setUserId(storedUserId); // Set userId from localStorage or session
// //     }
// //   }, []);

// //   // Define the handleFileSelect function
// //   const handleFileSelect = (fileUrl: string | null) => {
// //     if (fileUrl) {
// //       // Process the file URL here if needed
// //       console.log('File URL:', fileUrl);
// //     }
// //   };

// //   // Function to handle image upload button click
// //   const handleUploadButtonClick = () => {
// //     // You can trigger any additional behavior or open file picker if needed
// //     console.log('Upload Image button clicked');
// //   };

// //   return (
// //     <div className={styles.dashboardContainer}>
// //       <h1 className={styles.heading}>Welcome</h1>

// //       {/* Only render Login button if user is not logged in */}
// //       {!userId ? (
// //         <Link to="/login" className={styles.link}>
// //           <button className={styles.loginButton}>Login</button>
// //         </Link>
// //       ) : (
// //         <p className={styles.userGreeting}>Hello, User {userId}</p>
// //       )}

// //       <br />

// //       {/* Render the Upload Image button only if user is logged in */}
// //       {userId && (
// //         <div>
// //           <button
// //             onClick={handleUploadButtonClick}
// //             className={styles.uploadButton}
// //           >

// //           </button>
// //           {/* Pass the handleFileSelect function and userId as props to UploadFileButton */}
// //           <UploadFileButton
// //             onFileSelect={handleFileSelect}
// //             userId={userId}
// //           />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import UploadFileButton from "../UploadFileButton"; // Assuming UploadFileButton exists

// const Dashboard: React.FC = () => {
//   const location = useLocation(); // Get location object
//   const { userId, username } = location.state || {}; // Extract userId and username from location.state

//   // Static card data mimicking the VisitingCard model
//   const [cards] = useState([
//     {
//       _id: "1",
//       cardName: "Card 1",
//       cardImage: "https://via.placeholder.com/150",
//       name: "John Doe",
//       contact: ["1234567890"],
//       email: "john@example.com",
//       company: "ABC Corp",
//       designation: "Manager",
//     },
//     {
//       _id: "2",
//       cardName: "Card 2",
//       cardImage: "https://via.placeholder.com/150",
//       name: "Jane Smith",
//       contact: ["9876543210"],
//       email: "jane@example.com",
//       company: "XYZ Ltd",
//       designation: "Developer",
//     },
//     {
//       _id: "3",
//       cardName: "Card 3",
//       cardImage: "https://via.placeholder.com/150",
//       name: "Alice Johnson",
//       contact: ["4561237890"],
//       email: "alice@example.com",
//       company: "Tech Solutions",
//       designation: "Designer",
//     },
//   ]);

//   // Ensure user is logged in, if not redirect to login page
//   useEffect(() => {
//     if (!userId || !username) {
//       window.location.href = "/login"; // Redirect to login if user is not logged in
//     }
//   }, [userId, username]);

//   return (
//     <div>
//       <h1>Welcome to the Dashboard</h1>
//       {username ? (
//         <div>
//           <p>Welcome, {username}!</p>
//           <p>Your User ID: {userId}</p>

//           {/* Display cards */}
//           <div className="cards-container">
//             {cards.map((card) => (
//               <div key={card._id} className="card">
//                 <img
//                   src={card.cardImage}
//                   alt={card.cardName}
//                   className="card-image"
//                 />
//                 <h4>{card.name}</h4>
//                 <p>
//                   <strong>Contact:</strong> {card.contact.join(", ")}
//                 </p>
//                 <p>
//                   <strong>Email:</strong> {card.email}
//                 </p>
//                 <p>
//                   <strong>Company:</strong> {card.company}
//                 </p>
//                 <p>
//                   <strong>Designation:</strong> {card.designation}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Pass userId to UploadFileButton as a prop */}
//           <UploadFileButton
//             userId={userId}
//             onFileSelect={(url) => console.log("Uploaded file URL:", url)}
//           />
//         </div>
//       ) : (
//         <p>Please log in to access this page.</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;









import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UploadFileButton from "../UploadFileButton";
import Card from "./Card";
import './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const { userId, username } = location.state || {};
  const [cards, setCards] = useState<any[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null); // Track the selected card for update

  useEffect(() => {
    if (!userId || !username) {
      window.location.href = "/login";
    } else {
      const fetchCards = async () => {
        try {
          const response = await fetch("/api/card/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          });

          if (response.ok) {
            const visitingCards = await response.json();
            setCards(visitingCards.visitingCards);
          } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error || "Unable to fetch cards"}`);
          }
        } catch (error) {
          alert("An unexpected error occurred while fetching cards.");
        }
      };

      fetchCards();
    }
  }, [userId, username]);

  const refreshCards = async () => {
    const response = await fetch("/api/card/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      const visitingCards = await response.json();
      setCards(visitingCards.visitingCards);
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error || "Unable to fetch cards"}`);
    }
  };

  // Function to handle card update
  const handleCardUpdate = (cardId: string) => {
    setSelectedCardId(cardId); // Set the selected card for update
  };

  // Function to reset selected card (if cancel or finish updating)
  const resetSelectedCard = () => {
    setSelectedCardId(null);
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      {username ? (
        <div>
          <p>Welcome, {username}!</p>
          <p>Your User ID: {userId}</p>

          {cards.length > 0 ? (
            <div>
              <h3>Cards</h3>
              <div
                className="cards-container"
                style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
              >
                {cards.map((card: any) => (
                  <Card
                    key={card._id}
                    _id={card._id}
                    cardImage={card.cardImage}
                    name={card.name}
                    title={card.title}
                    description={card.description}
                    cardName={card.cardName}
                    company={card.company}
                    contact={card.contact}
                    createdAt={card.createdAt}
                    email={card.email}
                    currUserId={userId}
                    cardUserid={card.user}
                    refreshCards={refreshCards}
                    selectedCardId={selectedCardId} // Pass the selected card ID
                    handleCardUpdate={handleCardUpdate} // Pass function to handle card update
                    resetSelectedCard={resetSelectedCard} // Pass function to reset selected card
                  />
                ))}
              </div>
            </div>
          ) : (
            <p>No cards available</p>
          )}

          <UploadFileButton
            userId={userId}
            onFileSelect={(url) => console.log("Uploaded file URL:", url)}
          />
        </div>
      ) : (
        <p>Please log in to access this page.</p>
      )}
    </div>
  );
};

export default Dashboard;
