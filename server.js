const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const http = require('http');


const app = express();

app.use(cors());

// API file for interacting with MongoDB
const api = require('./routes/api/api');
const user = require('./routes/api/user');
const profile = require('./routes/api/profile');
const product = require('./routes/api/product');
const category = require('./routes/api/category');
const brand = require('./routes/api/brand');
const currency = require('./routes/api/currency');
const unit = require('./routes/api/unit');
const batch = require('./routes/api/batch');
const warehouse = require('./routes/api/warehouse');
const city = require('./routes/api/city');
const frieght = require('./routes/api/frieght');
const inventory = require('./routes/api/inventory');
const booker = require('./routes/api/booker');
const supplier = require('./routes/api/supplier');


// URL at which MongoDB service is running
const db = require('./config/keys').mongoURI;
// const db = "mongodb://localhost:27017/guruable";

//Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, '/dist')));


//Passport Middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);


// API location
app.use('/api', api);
app.use('/user', user);
app.use('/profile', profile);
app.use('/product', product);
app.use('/category', category);
app.use('/brand', brand);
app.use('/currency', currency);
app.use('/unit', unit);
app.use('/batch', batch);
app.use('/warehouse', warehouse);
app.use('/city', city);
app.use('/frieght', frieght);
app.use('/inventory', inventory);
app.use('/booker', booker);
app.use('/supplier', supplier);


// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

//Set Port
// const port = process.env.PORT || '3000';
// app.set('port', port);
//
// const server = http.createServer(app);
//
// server.listen(port, () => console.log(`Running on localhost:${port}`));
//


app.listen(process.env.PORT  || '3000');

// const port = process.env.PORT || 8000;
//
// server.listen(port, () => console.log(`Running on localhost:${port}`));