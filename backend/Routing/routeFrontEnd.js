//route static and frontend to index.js 
const express = require('express');
const router = express.Router();  
const path = require("path");  
router.use(express.static("public"));
router.use("/Assets",express.static('backend/Assets'));
 router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html")); 
    res.sendFile(path.join(__dirname,"backend/Assets"))
}); 
module.exports = router;