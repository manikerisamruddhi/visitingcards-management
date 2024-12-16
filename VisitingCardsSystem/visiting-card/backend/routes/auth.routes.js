const express = require("express");
const router = express.Router();
const {
  signUpController,
  signInController,
  getUserDetails,
} = require("../controller/auth.controller.js");
router.post("/sign-up", signUpController,()=>{
  console.log("Backend snehal");
});

router.post("/log-in", signInController);
router.get('/getUser',getUserDetails);

module.exports = router;
