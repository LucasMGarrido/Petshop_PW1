const router = require("express").Router()
const responsavelController = require("../controller/responsavelController")
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

router.route('/responsavel').post(verifyJWT,(req, res) => responsavelController.create(req, res))
router.route('/responsavel').get(verifyJWT,(req, res) => responsavelController.read(req, res))
router.route('/responsavel/:id').put(verifyJWT,(req, res) => responsavelController.update(req, res))
router.route('/responsavel/:id').delete(verifyJWT,(req, res) => responsavelController.delete(req, res))

module.exports = router