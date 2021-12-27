const validator = require('express-validator');
const User = require('../models/User');

module.exports.addUser = [
    validator.body('username', 'Please enter a valid username!').isLength({ min:1 }),
    validator.body('username').custom(value => {
        return User.findOne({username:value})
        .then(user => {
            if(user !== null) {
                return Promise.reject("Username already taken.")
            }
        });
    }),

    function(req, res) {
        const errors = validator.validationResult(req);
        if(!errors.isEmpty()) {
            return res.json({errors: errors.mapped()})
        }

        // initialize new user record
        var user = new User({
            username: req.body.username,
            password: req.body.password
        });

        user.save((err, createdUser)=>{
            if(err) {
                return res.status(500).json({message: err.mapped()});
            }
            return res.status(200).json({message: "User created successfully!"});
        });
    }
];

module.exports.getAllUsers = (req,res, next) => {
   
    return User.find().then(users=>{
        if(users !== null) {
            return res.send(users);
        }
        return res.json({message: "No records to display!"})
    })
};

module.exports.deleteUser = [
    validator.body('username', "Please select a username to delete").isLength({min:1}),
    validator.body('username').custom(value => {
        return User.find({username: value}).then(user=>{
            if(user === null) {
                return Promise.reject("Username doesn't exist");
            }
        })
    }),

    function(req, res) {
        const errors = validator.validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({error: errors.mapped()});
        }

        User.deleteOne({username:req.body.username}).then(result=>{
            if(result.deletedCount === 1) {
                return res.status(200).json({message: "User deleted successfully!"});
            }
            return res.status(200).json({message: "User already deleted!"});
        })
    }
]