const validator = require('express-validator');
const Files = require('../models/Uploads');

module.exports.create = [
    validator.body('filesize', 'File is too large or too small').isNumeric({min:10, max:1000}),
    validator.body('name').custom(value => {
        return Files.findOne({name:value})
        .then((file) => {
            if(file !== null) 
            {
                return Promise.reject("Duplicate filename!");
            }
        });
    }),

    function(req, res)
    {
        const errors = validator.validationResult(req);
        if(!errors.isEmpty()) 
        {
            return res.json({err: errors.mapped()})
        }

        const file = new Files({
            name: req.body.name,
            filesize: req.body.filesize,
        })

        file.save((err, created) => {
            if(err)
            {
                return res.status(500).json({message: err.mapped()});
            }
            return res.status(200).json({message: "file saved successfully!"})
        })
    }

]