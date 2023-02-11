const express = require('express');
const router = express.Router();  
const path = require("path");    
router.get('/something', (req, res) => {
    res.send('Hello World!')
  })
module.exports = router; 