import React, { useState } from 'react';
import './Card.css';
import UpdateForm from '../UpdateForm';
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

interface CardProps {
  _id: string;
  cardImage: string;
  name: string | undefined;
  title: string | undefined;
  designation: string | undefined;
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
  designation,
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
    <div className="card-containerr"  key={_id}>
      <div className="card" style={{backgroundColor:'#D3D3D3'}}>
        <img className="card-image" src={cardImage} alt={title} />
        <div className="card-body" >
          <h4 className="card-title">{name}</h4>
          {company && <p className="company"><b>Company: </b>{company}</p>}
          {contact && <p className="contact"><b>Contact: </b>{contact}</p>}
         {email && <p className="email"><b>Email: </b>{email}</p>}
          {designation && <p className="card-description"><b>Address: </b>{designation}</p>}
          {cardUserid === currUserId && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <button onClick={() => handleUpdateFormVisible()} style={{ padding: "5px" , backgroundColor: "#007bff",border: "none",width:'120px',
    borderRadius: "5px",cursor: "pointer", 
    fontSize: "16px", 
    transition: "background-color 0.3s ease",}}>
                Update
              </button>
              {/* <button onClick={deleteHandle} style={{ padding: "5px" }}>
                Delete
              </button> */}
             <button
  onClick={() => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      deleteHandle();
    }
  }}
  style={{
    padding: "5px 10px", // Padding around the button text
    backgroundColor: "red", // Red background color
    color: "black", // White text color
    border: "none", // No border
    borderRadius: "5px", // Rounded corners
    cursor: "pointer", // Pointer cursor on hover
    fontSize: "16px", // Text size
    transition: "background-color 0.3s ease", // Smooth transition for background color change
    width:'130px'
  }}
  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#d9534f"} // Darker red on hover
  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#d11a2a"} // Reset to red on mouse leave
>
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
