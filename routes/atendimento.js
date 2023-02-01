const router = require("express").Router()

const atendimentoController = require("../controller/atendimentoController")

router.route('/atendimento').post((req, res) => atendimentoController.create(req, res))
router.route('/atendimento').get((req, res) => atendimentoController.read(req, res))
router.route('/atendimento/:id').get((req, res) => atendimentoController.readOne(req, res))
router.route('/atendimento/:id').delete((req, res) => atendimentoController.delete(req, res))
router.route('/atendimento/:id').patch((req, res) => atendimentoController.update(req, res))

module.exports = router