const router = require("express").Router()

const userController = require("../controller/userController")

router.route('/signup').post((req, res) => userController.create(req, res))
router.route('/authenticate').post((req, res) => userController.authenticate(req, res))

/*
router.route('/pet').get((req, res) => petController.read(req, res))
router.route('/pet/:id').delete((req, res) => petController.delete(req, res))
router.route('/pet/:id').put((req, res) => petController.update(req, res)) */

module.exports = router