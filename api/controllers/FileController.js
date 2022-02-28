const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const { db, gfs } = require('../db');

module.exports.savefile = (req, res, next) => {
    // storage engine
    const storage = new GridFsStorage({
        url: process.env.CONN_URI,
        file: (req, file) => {
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, (err, buff) => {
                    if(err) 
                    {
                        return reject(err);
                    }

                    const filename = buff.toString('hex') + path.extname(file.originalname);
                    const fileInfo = {
                        filename: filename,
                        bucketName: 'uploads'
                    };
                    resolve(fileInfo);
                })
            })
        }
    });

    const upload = multer({ storage });

    upload.single('file');

    res.json({'file': req.file});
    // res.redirect('/');
}

module.exports.fileregister = (req, res, next) => {
    gfs.file.find().toArray((err, files) => {
        if(!files || files.length === 0) 
        {
            return res.status(404).json({err: "No files found"});
        }

        return res.status(200).json(files);
    })
}