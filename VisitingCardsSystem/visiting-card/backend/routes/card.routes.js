const express = require("express");
const {
  getAllCardsController,
  getSpecificCardController,
  updateCardInfoController,
  deleteCardController,
} = require("../controller/card.controller.js");
const router = express.Router();

//get all the card -- userId should pass from the req body
router.post("/", getAllCardsController);

//to get specific data of the card
router.get("/:cardId", getSpecificCardController);

//update the data of card
router.patch("/:cardId", updateCardInfoController);

//deteing spacific card
router.delete("/:cardId", deleteCardController);

module.exports = router;
