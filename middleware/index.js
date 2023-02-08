const jwt = require("jsonwebtoken")

function verifyJWT(req, res, next){
    const { token } = req.cookies;
    if (token == undefined){
        return res.status(500).redirect('/api/erro'); 
    }
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err){
            return res.status(500);
        }  
        next(); 
    }); 
} 

module.exports = verifyJWT