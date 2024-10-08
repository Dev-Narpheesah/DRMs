const express = require("express");
const multer = require("multer");
const {
    registerUser,
    getAllUsers,
    getUser,
    updateUserProfile,
    deleteUser,
} = require("../controllers/userController");

const router = express.Router();
const upload = multer(); 
router.post("/register", upload.single('file'), registerUser); 
router.get("/", getAllUsers);  
router.get("/:id", getUser);  
router.patch("/:id", upload.single('file'), updateUserProfile);  
router.delete("/:id", deleteUser); 

module.exports = router;
