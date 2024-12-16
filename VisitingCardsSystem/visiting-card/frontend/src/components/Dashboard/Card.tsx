import React, { useState } from 'react';
import './Card.css';
import UpdateForm from '../UpdateForm';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

interface CardProps {
  _id: string;
  cardImage: string;
  name: string | undefined;
  title: string | undefined;
  description: string | undefined;
  cardName: string | undefined;
  company: string | undefined;
  contact: any;
  createdAt: Date;
  email: string | undefined;
  refreshCards: () => void;
  currUserId: string;
  cardUserid: string;
  selectedCardId: string | null; // Track selected card ID
  handleCardUpdate: (cardId: string) => void; // Function to handle card update
  resetSelectedCard: () => void; // Function to reset selected card
}

const Card: React.FC<CardProps> = ({
  _id,
  cardImage,
  name,
  title,
  description,
  cardName,
  company,
  contact,
  createdAt,
  email,
  refreshCards,
  currUserId,
  cardUserid,
  selectedCardId,
  
 
}) => {
  const [updateFormVisible, setUpdateFormVisible] = useState<boolean>(false);
 const navigate = useNavigate();
  const deleteHandle = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/card/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        refreshCards();
      } else {
        alert(`Error: ${data.error || "Unable to delete card"}`);
      }
    } catch (error) {
      alert("An error occurred while deleting the card.");
    }
  };

  const handleUpdateFormVisible = () => {
    setUpdateFormVisible(!updateFormVisible);
   navigate(`/${_id}/update`, { state: {_id } });
  };

  if (selectedCardId === _id) {
    return (
      <div className="update-form-container">
        {/* <UpdateForm resetSelectedCard={resetSelectedCard} /> */}
      </div>
    );
  }

  return (
    <div className="card-containerr" key={_id}>
      <div className="card">
        <img className="card-image" src={cardImage} alt={title} />
        <div className="card-body">
          <h4 className="card-title">{cardName}</h4>
          <p className="card-description">{description}</p>
          <p className="company">{company}</p>
          <p className="contact">{contact}</p>
          <p className="email">{email}</p>
          {cardUserid === currUserId && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {/* <button onClick={() => handleUpdateFormVisible()} style={{ padding: "5px" }}>
                Update
              </button> */}
              <button onClick={deleteHandle} style={{ padding: "5px" }}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
