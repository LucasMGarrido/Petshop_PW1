const router = require("express").Router()
const petController = require("../controller/petController")
const jwt = require("jsonwebtoken")

function verifyJWT(req, res, next){ //função que checa se o token é válido
    var { token } = req.cookies;
    //o token pode ser passado tanto no cabeçalho através
    if (!token){ //se não existir token, temos um erro
        res.status(500); 
    }
    jwt.verify(token, process.env.SECRET, function(err, decoded) { //jwt.verify verifica o token
        if (err){
            return res.status(500);
        }  
        next(); 
    }); 
} 

router.route('/pet').post(verifyJWT, (req, res) => petController.create(req, res))
router.route('/pet').get(verifyJWT, (req, res) => petController.read(req, res))
router.route('/pet/:id').delete(verifyJWT, (req, res) => petController.delete(req, res))
router.route('/pet/:id').put(verifyJWT, (req, res) => petController.update(req, res))

module.exports = router