const express = require("express");
const { uploadImageController } = require("../controller/user.controller");
const router = express.Router();
router.post("/upload", uploadImageController);

module.exports = router;
