const jwt = require("jsonwebtoken")

function verifyJWT(req, res, next){
    const { token } = req.cookies;
    if (token == undefined){
        const msg = "Token Inválido! Usuário não está logado!"
        return res.render('../views/erro.ejs', {msg})
    }
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err){
            const msg = "Token Inválido!"
            return res.render('../views/erro.ejs', {msg})
        }  
        next(); 
    }); 
} 

module.exports = verifyJWT