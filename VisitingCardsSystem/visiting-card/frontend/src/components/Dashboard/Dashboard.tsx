
import React, { useState, useEffect } from "react";
import { useLocation,useNavigate  } from "react-router-dom";
import UploadFileButton from "../UploadFileButton";
import Card from "./Card";
import "./Dashboard.module.css";
import { LoopEffectAction } from "@cloudinary/url-gen/actions/effect/leveled/Loop";

const Dashboard: React.FC = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const { userId, username } = location.state || {};
  const [cards, setCards] = useState<any[]>([]);
  const [filteredCards, setFilteredCards] = useState<any[]>([]); // For filtered cards
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search query
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  useEffect(() => {
    
    if (!userId || !username) {
      //window.location.href = "/login";
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
            setFilteredCards(visitingCards.visitingCards); // Initially, filtered cards are all cards
           console.log("carddata",visitingCards.visitingCards)
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

  ;
  
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  
    if (query) {
      // Filter cards based on the name
      const filtered = cards.filter(
        (card) =>
          card.name.toLowerCase().includes(query) // Only filter by name
      );
      setFilteredCards(filtered);
    } else {
      // If no query, show all cards
      setFilteredCards(cards);
    }
  };
  

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
      setFilteredCards(visitingCards.visitingCards); // Update both cards and filteredCards
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error || "Unable to fetch cards"}`);
    }
  };

  const handleCardUpdate = (cardId: string) => {
    setSelectedCardId(cardId);
  };

  const resetSelectedCard = () => {
    setSelectedCardId(null);
  };

  const handleLogout = () => {
    // Clear user session data (example: localStorage or any global state)
    localStorage.removeItem("userToken"); // Remove user token if stored in localStorage
    localStorage.removeItem("username"); // Remove username or other user details
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      {username ? (
        <div>
       <nav className="navbar" style={{ backgroundColor: "#f8f9fa", marginTop: "0" }}>
  <h1
    className="navbar-title"
    style={{
      textAlign: "center",
      justifyItems: "center",
      fontSize: "40px",
      color: "blue",
      margin: "0", // Ensure no additional margins
    }}
  >
    Welcome {username}!
  </h1>
  <p className="upload-container">
    <UploadFileButton
      userId={userId}
      onFileSelect={(url) => console.log("Uploaded file URL:", url)}
    />
   <button
                onClick={handleLogout}
                style={{
                  padding: "10px 20px",
                  marginTop: "10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  marginLeft:'90%'
                }}
                onMouseEnter={(e) =>
                  (e.target as HTMLButtonElement).style.backgroundColor =
                    "#c82333"
                }
                onMouseLeave={(e) =>
                  (e.target as HTMLButtonElement).style.backgroundColor =
                    "#dc3545"
                }
              >
                Logout
              </button>
  </p>
</nav>

          <div>
          <input
  type="text"
  placeholder="Search by name"
  value={searchQuery}
  onChange={handleSearch}
  className="search-input"
/>


<button
  onClick={refreshCards}
  style={{
    padding: "10px 20px", // Adds padding inside the button
    backgroundColor: "#007bff", // Blue background color
    color: "white", // White text color
    fontSize: "16px", // Text size
    border: "none", // No border
    borderRadius: "5px", // Rounded corners
    cursor: "pointer", // Pointer cursor on hover
    transition: "background-color 0.3s ease", // Smooth background-color change on hover
    marginLeft:"10px"
  }}
  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#0056b3"}
  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#007bff"}
>
  Reset
</button>

           
            
          </div>
          {filteredCards.length > 0 ? (
            <div>
              <h3
                style={{
                  textAlign: "center",
                  justifyItems: "center",
                  fontSize: "34px",
                }}
              >
                Cards
              </h3>
              <div
                className="cards-container"
                style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
              >
                {filteredCards.map((card: any) => (
                  <Card
                    key={card._id}
                    _id={card._id}
                    cardImage={card.cardImage}
                    name={card.name}
                    title={card.title}
                    designation={card.designation}
                    cardName={card.cardName}
                    company={card.company}
                    contact={card.contact}
                    createdAt={card.createdAt}
                    email={card.email}
                    currUserId={userId}
                    cardUserid={card.user}
                    refreshCards={refreshCards}
                    selectedCardId={selectedCardId}
                    handleCardUpdate={handleCardUpdate}
                    resetSelectedCard={resetSelectedCard}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p>No cards available</p>
          )}
          {/* <UploadFileButton
            userId={userId}
            onFileSelect={(url) => console.log("Uploaded file URL:", url)}
          /> */}
        </div>
      ) : (
        <p>Please log in to access this page.</p>
      )}
    </div>
  );
};

export default Dashboard;
