import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface CardData {
  _id: string;
  name?: string;
  company?: string;
  contact?: string;
  email?: string;
  designation?: string;
  cardImage?: string;
}

const UpdateForm: React.FC = () => {
  const location = useLocation();
  const { _id } = location.state || {};

  const [cardData, setCardData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/card/${_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch card data");
        }
        const data = await response.json();
        setCardData(data.card);
      } catch (error) {
        console.error("Error fetching card data:", error);
        setError("Failed to load card data.");
      } finally {
        setLoading(false);
      }
    };

    if (_id) {
      fetchCardData();
    }
  }, [_id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardData) return;

    try {
      setSuccess(false);
      setError(null);

      const response = await fetch(`http://localhost:3000/api/card/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardData), // Send the updated card data
      });

      if (!response.ok) {
        throw new Error("Failed to update card data");
      }

      setSuccess(true);
    } catch (error) {
      console.error("Error updating card data:", error);
      setError("Failed to update card details. Please try again.");
    }
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  };

  const titleStyle: React.CSSProperties = {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  const labelStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    color: "#555",
    fontWeight: "bold",
  };

  const inputStyle: React.CSSProperties = {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    transition: "border-color 0.3s",
  };

  const inputFocusStyle: React.CSSProperties = {
    borderColor: "#007bff",
    outline: "none",
    boxShadow: "0 0 4px rgba(0, 123, 255, 0.2)",
  };

  const buttonStyle: React.CSSProperties = {
    padding: "12px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const buttonHoverStyle: React.CSSProperties = {
    backgroundColor: "#0056b3",
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", fontSize: "18px", color: "#555" }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", fontSize: "18px", color: "#e74c3c" }}>
        {error}
      </div>
    );
  }

  if (!cardData) {
    return (
      <div style={{ textAlign: "center", fontSize: "18px", color: "#e74c3c" }}>
        No card data found.
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Update Card</h1>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label style={labelStyle}>
          Name:
          <input
            type="text"
            value={cardData.name || ""}
            style={inputStyle}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor =
                inputFocusStyle.borderColor as string;
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = "#ccc";
            }}
            onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
          />
        </label>
        <label style={labelStyle}>
          Company:
          <input
            type="text"
            value={cardData.company || ""}
            style={inputStyle}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor =
                inputFocusStyle.borderColor as string;
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = "#ccc";
            }}
            onChange={(e) =>
              setCardData({ ...cardData, company: e.target.value })
            }
          />
        </label>
        <label style={labelStyle}>
          Contact:
          <input
            type="text"
            value={cardData.contact || ""}
            style={inputStyle}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor =
                inputFocusStyle.borderColor as string;
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = "#ccc";
            }}
            onChange={(e) =>
              setCardData({ ...cardData, contact: e.target.value })
            }
          />
        </label>
        <label style={labelStyle}>
          Email:
          <input
            type="email"
            value={cardData.email || ""}
            style={inputStyle}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor =
                inputFocusStyle.borderColor as string;
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = "#ccc";
            }}
            onChange={(e) =>
              setCardData({ ...cardData, email: e.target.value })
            }
          />
        </label>
        <label style={labelStyle}>
          Address:
          <input
            type="text"
            value={cardData.designation || ""}
            style={inputStyle}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor =
                inputFocusStyle.borderColor as string;
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = "#ccc";
            }}
            onChange={(e) =>
              setCardData({ ...cardData, designation: e.target.value })
            }
          />
        </label>

        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              buttonHoverStyle.backgroundColor as string;
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor =
              "#007bff";
          }}
        >
          Save Changes
        </button>
        {success && (
          <div
            style={{ textAlign: "center", color: "green", marginTop: "10px" }}
          >
            Card updated successfully!
          </div>
        )}
        {error && (
          <div style={{ textAlign: "center", color: "red", marginTop: "10px" }}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateForm;
