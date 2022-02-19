const express = require('express');
const db = require('./db');

const app = express();

// init bodyparser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// register routes
const users = require('./routes/users');
const files = require('./routes/files');

// use routes
app.use(users);
app.use(files);

module.exports = app;