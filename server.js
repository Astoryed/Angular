const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');


const app = express();

// API file for interacting with MongoDB
const api = require('./routes/api/api');
const user = require('./routes/api/user');
const profile = require('./routes/api/profile');


// URL at which MongoDB service is running
const db = "mongodb://localhost:27017/guruable";

//Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'src')));

// API location
app.use('/api', api);
app.use('/user', user);
app.use('/profile', profile);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
