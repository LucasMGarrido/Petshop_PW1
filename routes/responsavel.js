const router = require("express").Router()
const responsavelController = require("../controller/responsavelController")

router.route('/responsavel').post((req, res) => responsavelController.create(req, res))
router.route('/responsavel').get((req, res) => responsavelController.read(req, res))
router.route('/responsavel/:id').patch((req, res) => responsavelController.update(req, res))
router.route('/responsavel/:id').delete((req, res) => responsavelController.delete(req, res))

module.exports = router