// jsonwebtoken secret key
const jwt = require('jsonwebtoken');

const config = {
    authSecret: 'mysecret'
};

module.exports = config;

module.exports.isAuthenticated = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if(bearerHeader !== undefined) 
    {
        const auth_str = bearerHeader.split(' ');

        const token  = auth_str[1];

        jwt.verify(token, config.authSecret, (err, decode) => {
            if(err) 
            {
                return res.status(401).json({errors: err.mapped()});
            }
            else 
            {
                // return res.status(200).json({user: decode});
                return next();
            }
        })
    }
    else 
    {
        return res.status(404).json({message: "Token unavailable"});
    }
}