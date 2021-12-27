const express = require('express');
const db = require('./db');

const app = express();

// init bodyparser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// register routes
const users = require('./routes/users');

// use routes
app.use(users);

module.exports = app;