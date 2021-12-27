const crypto = require('crypto');//for unique name
const path = require('path');
const mongoose = require('mongoose');//orm for mongo
const multer = require('multer');//Nodejs middleware for handling file uploads
const GridFsStorage = require('multer-gridfs-storage');


const URI = "mongodb://appuser:appuser123@localhost:27017/compressed";


const conn  = mongoose.connect(URI, {
    useNewUrlParser: true,//to avoid duplication warning
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Err: "));//listener
db.once("open", ()=>{ //one time listener
    console.log("Connection Successful!");
});


module.exports = db;
