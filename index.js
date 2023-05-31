//Define modules and ports needed
/*  
Requires the Express and Path modules,   
creates an Express app, and sets the port to  
either the environment variable (process.env.PORT) or 3000.  
*/
const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");  
const utils = require("./backend/utils/utilsIndex.js")
const helmet = require("helmet");
//connecting to mongodb
const connectDB = require("./backend/configs/db.js");
connectDB();
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());
app.use(helmet());
// Set the Content-Security-Policy header
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "font-src": [
        "'self'",
        "https://fonts.gstatic.com",
        "https://kit.fontawesome.com",
        "'unsafe-inline'",
      ],
      "style-src": ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
    },
  })
);
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://kit.fontawesome.com ");
  next();
});
/* 
File System (fs) module to read all the files in the "backend/Routing" folder  
and run the middleware in each file.  
*/
const fs = require("fs");
fs.readdirSync(path.join(__dirname, "backend", "Routing")).forEach((file) => {
  const route = require(`./backend/Routing/${file}`); 
  app.use(route);
});
/* 
  Routing for the files in the frontend public folder 
  Has to be done after routing for backend files
  */
app.use(express.static(__dirname + "/public"));
app.use("/Assets", express.static("backend/Assets"));
utils.allUtils();
//Create localhost server.
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
