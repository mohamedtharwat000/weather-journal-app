// express module and middleware
const express = require("express");
const bodyParser = require("body-parser");

// express instance
const app = express();

// use express middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors module
const cors = require("cors");
app.use(cors());

// Initialize the project folder
app.use(express.static("website"));
const port = "8000";

// object to act as endpoint for all routes
let projectData = {};

// get route
app.get("/data", (req, res) => {
  res.send(projectData);
});

// post route
app.post("/addData", (req, res) => {
  projectData.date = req.body.date;
  projectData.temp = req.body.temp;
  projectData.weather = req.body.weather;
  projectData.feelings = req.body.feelings;
});

// start the Server
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
