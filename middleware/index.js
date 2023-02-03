const jwt = require("jsonwebtoken")

function verifyJWT(req, res, next){ //função que checa se o token é válido
    var { token } = req.cookies;
    //o token pode ser passado tanto no cabeçalho através
    // do cabeçalho "x-access-token" ou através do corpo da requisição
    if (!token) //se não existir token, temos um erro
        res.status(500); 

    jwt.verify(token, process.env.SECRET, function(err, decoded) { //jwt.verify verifica o token
        if (err){
            return res.status(500);
        }
        next(); 
    }); 
}

module.exports = verifyJWT