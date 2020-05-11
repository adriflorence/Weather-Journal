// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');

// Middleware
// Configuring express to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

// Callback function
function listening(){
    console.log(`server running on localhost: ${port}`);
}

// HTTP REQUESTS

// Get
app.get('/', function (req, res) {
    res.send(projectData);
});

// Post
app.post('/addAnswer', addAnswer);
function addAnswer (req, res) {
    let data = req.body
    // manually set the string for the key of the new JS object entry
    projectData['temperature'] = data.temperature;
    projectData['date'] = data.date;
    projectData['user_response'] = data.user_response;
    console.log(projectData);
};