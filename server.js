// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Dependencies
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors'); // cross origin allowance

// Start up an instance of app
const app = express();

// Middleware
// Configuring express to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// HTTP ROUTES

// Get
app.get('/entry', function (req, res) {
    res.status(200).send(projectData);
});

// Post
app.post('/entry', addAnswer);
function addAnswer (req, res) {
    let { date, temp, content } = req.body
    // manually set the string for the key of the new JS object entry
    projectData[date] = {
        temp,
        content
    }
    res.send();
};