const mongoose = require('mongoose');//orm for mongo
const dotenv = require('dotenv');
const multer = require('multer'); //Nodejs middleware for handling file uploads
const { GridFsStorage } = require('multer-gridfs-storage');
dotenv.config();

const URI = process.env.CONN_URI;

const conn  = mongoose.connect(URI, {
    useNewUrlParser: true,//to avoid duplication warning
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Err: "));//listener

let bucket;
db.once("open", ()=>{ //one time listener
    let dbs = mongoose.connection[0];
    // bucket = new mongoose.mongo.GridFSBucket(dbs, {
    //     bucketName: "uploads"
    // })
    // console.log(`Connection Successful, our bucket is: ${bucket}`);
});


module.exports = db;
