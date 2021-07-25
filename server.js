// Setup empty JS object to act as endpoint for all routes
let projectData = {};
const port = 3000;

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
/** body-parser is currently deprecated. */
//const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const server = app.listen(port, () => {
    console.log('running');
    console.log(`running on ${port}`);
});

app.get('/all', (req, res) => {
    console.log('get');
    res.send(projectData);
})

app.post('/addWeather', (req, res) => {
    console.log('post');
    let newData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userRes: req.body.userRes
    }
    projectData = newData;
    res.send(projectData);
});