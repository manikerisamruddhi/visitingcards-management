const mongoose = require("mongoose");
const VisitingCard = require("../models/visitingCard.model.js"); // Adjust the path as needed

const getAllCardsController = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("this is user io at  get all card ",userId)
    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    
    // Query database for all cards belonging to the user
    const visitingCards = await VisitingCard.find();

    // Check if no cards found
    if (!visitingCards.length) {
      return res
        .status(404)
        .json({ message: "No visiting cards found for the specified user" });
    }

    // Respond with the visiting cards
    return res.status(200).json({
      message: "Visiting cards retrieved successfully",
      visitingCards,
    });
  } catch (error) {
    console.error("Error in getAllCardsController: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getSpecificCardController = async (req, res) => {
  try {
    const { cardId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    
    const card = await VisitingCard.findById(cardId);

    if (!card) {
      res.json({ error: "No card found" });
    }

    return res.status(200).json({ card });
  } catch (error) {
    console.log("Error in getSpecificCardController : ", error);
    return res.status(500).json({ error: "Internal server error " });
  }
};

const updateCardInfoController = async (req, res) => {
  try {
    const { cardId } = req.params; // ID of the card to update
    const updateData = req.body; // Data to update

    // Validate cardId
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      return res.status(400).json({ error: "Invalid card ID" });
    }

    // Find and update the visiting card
    const updatedCard = await VisitingCard.findByIdAndUpdate(
      cardId,
      { $set: updateData }, // Only update the fields provided in req.body
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedCard) {
      return res.status(404).json({ error: "Visiting card not found" });
    }

    return res.status(200).json({
      message: "Visiting card updated successfully",
      visitingCard: updatedCard,
    });
  } catch (error) {
    console.error("Error in updateCardInfoController:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCardController = async (req, res) => {
  try {
    const { cardId } = req.params;
    await VisitingCard.deleteOne({ _id: cardId });
    return res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error in deleteCardController :", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllCardsController,
  getSpecificCardController,
  updateCardInfoController,
  deleteCardController,
};
