const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    filesize: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('file', FileSchema, 'files');