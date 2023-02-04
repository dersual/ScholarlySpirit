//Define modules and ports needed 
/*  
Requires the Express and Path modules,   
creates an Express app, and sets the port to  
either the environment variable (process.env.PORT) or 3000.  
*/ 
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;  
//connecting to mongodb
const connectDB = require("./backend/Model/db.js"); 
connectDB();
/* 
File System (fs) module to read all the files in the "backend/Routing" folder  
and run the middleware in each file.  
*/ 

const fs = require('fs');
fs.readdirSync(path.join(__dirname, "backend" ,'Routing'))
  .forEach(file => {
    const route = require(`./backend/Routing/${file}`);
    app.use(route);
  });
//Create localhost server. 
app.listen(port, () => {
  console.log(`Server running on ${port}`);  
}); 

