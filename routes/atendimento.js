const router = require("express").Router()
const jwt = require("jsonwebtoken")

//const verify = require("../middleware/index")

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

const atendimentoController = require("../controller/atendimentoController")

router.route('/atendimento').post(verifyJWT, (req, res) => atendimentoController.create(req, res))
router.route('/atendimento').get(verifyJWT, (req, res) => atendimentoController.read(req, res))
router.route('/atendimento/:id').get((req, res) => atendimentoController.readOne(req, res))
router.route('/atendimento/:id').delete((req, res) => atendimentoController.delete(req, res))
router.route('/atendimento/:id').patch((req, res) => atendimentoController.update(req, res))

module.exports = router