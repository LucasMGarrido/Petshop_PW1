const router = require("express").Router()

const userController = require("../controller/userController")

// Cadastro
router.route('/singup').get((req, res) => userController.cadastro(req, res))
router.route('/singup').post((req, res) => userController.create(req, res))
//Login
router.route('/singin').get((req, res) => userController.login(req, res))
router.route('/singin').post((req, res) => userController.authenticate(req, res))
//router.route('/authenticate').post((req, res) => userController.authenticate(req, res))

/*
router.route('/pet').get((req, res) => petController.read(req, res))
router.route('/pet/:id').delete((req, res) => petController.delete(req, res))
router.route('/pet/:id').put((req, res) => petController.update(req, res)) */

module.exports = router