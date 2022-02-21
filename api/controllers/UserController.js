const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('express-validator');
const User = require('../models/User');
const config = require('../config');

module.exports.register = [
    validator.body('username', 'Please enter a valid username!').isLength({ min:1 }),
    validator.body('username').custom(value => {
        return User.findOne({username:value})
        .then(user => {
            if(user !== null) {
                return Promise.reject("Username already taken.");
            }
        });
    }),

    validator.body('password', 'A strong password must be 6 characters long!').isLength({ min:6 }),

    function(req, res) {
        const errors = validator.validationResult(req);
        if(!errors.isEmpty()) {
            return res.json({errors: errors.mapped()})
        }

        // hash the password
        const salt = bcrypt.genSalt(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        // initialize new user record
        var user = new User({
            username: req.body.username,
            password: hash
        });

        user.save((err, createdUser)=>{
            if(err) {
                return res.status(500).json({message: err.mapped()});
            }
            return res.status(200).json({message: "User created successfully!"});
        });
    }
];

module.exports.login = [
    validator.body('username', 'Please enter a valid username!').isLength({ min:1 }),
    validator.body('username').custom(value => {
        return User.findOne({username:value})
        .then(user => {
            if(user == null) {
                return Promise.reject("That username doesn't exist!");
            }
        });
    }),
    validator.body('password', 'A strong password must be 6 characters long!').isLength({ min:6 }),

    function(req, res) 
    {
        const errors = validator.validationResult(req);

        if(!errors.isEmpty()) 
        {
            return res.status(500).json({err: errors.mapped()});
        }

        User.findOne({username:req.body.username}, (err, results, mapped) => {
            if(err) 
            {
                return res.status(500).json({err: err.mapped()}) ;
            }

            if(results.length > 0) 
            {
                const user = results;

                return bcrypt.compare(req.body.password, user.password, (error, isMatched) => {
                    if(isMatched) 
                    {
                        return res.json({
                            user: {
                                username: user.username,
                            },
                            token: jwt.sign({username:uer.username}, config.authSecret)
                        })
                    }
                    else
                    {
                        return res.status(500).json({errors: "Invalid password!"});
                    }
                })
            }
            else
            {
                return res.status(500).json({errors: "Invalid username!"});
            }
        })
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