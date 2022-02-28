const mongoose = require('mongoose');//orm for mongo
const dotenv = require('dotenv');
const crypto = require('crypto');
const multer = require('multer'); //Nodejs middleware for handling file uploads
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
dotenv.config();

const URI = process.env.CONN_URI;

const conn  = mongoose.connect(URI, {
    useNewUrlParser: true,//to avoid duplication warning
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Err: "));//listener

db.once("open", ()=>{ //one time listener
    console.log(`Connection Successful`);
});

// connect to gridfs
let gfs;
db.once('open', () => {
    gfs = Grid(db, mongoose.mongo);
    gfs.collection('uploads');
});


module.exports = {db:db, gfs:gfs};
