const config = require('../config');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('express-validator');

module.exports.register = [
    validator.body('username', 'Please enter a valid username!'),
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
            return res.status(500).json({errors: errors.mapped()});
        };

        const user = new User({
            username: req.body.username,
            password: req.body.password
        });

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        // hashed password
        user.password = hash;

        // initialize new user record

        user.save((err, createdUser) => {
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
            if(user === null) {
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

        User.findOne({username:req.body.username}, (err, result) => {
            if(err) 
            {
                return res.status(500).json({message: "Error trying to login!", error: err.mapped()});
            }

            if(result === null) 
            {
                return res.status(404).json({message: "User with that username doesn't exist"});
            }

            return bcrypt.compare(req.body.password, result.password, (err, isMatched) => {
                if(isMatched === true) 
                {
                    return res.status(200).json({
                        user: {
                            username: result.username
                        },
                        token: jwt.sign({username: result.username}, config.authSecret)
                    });
                }
                else 
                {
                    return res.status(500).json({message: "Invalid login credentials!"});
                }
            })
        });
    }
];

// get User
module.exports.user = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if(bearerHeader !== undefined) 
    {
        const auth_str = bearerHeader.split(' ');

        const token = auth_str[1];

        // token verification
        jwt.verify(token, config.authSecret, (err, decode) => {
            if(err) 
            {
                return res.status(401).json({errors: err.mapped()});
            }
            else 
            {
                return res.status(200).json({user: decoded});
            }
        });
    }
    else 
    {
        return res.status(404).json({message: "No token found!"});
    }
}

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