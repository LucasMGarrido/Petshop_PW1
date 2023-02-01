const router = require("express").Router()

const petController = require("../controller/petController")

router.route('/pet').post((req, res) => petController.create(req, res))
router.route('/pet').get((req, res) => petController.read(req, res))
router.route('/pet/:id').delete((req, res) => petController.delete(req, res))
router.route('/pet/:id').put((req, res) => petController.update(req, res))

module.exports = router