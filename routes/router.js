const router = require("express").Router()
const petRouter = require("./pet")
const responsavelRouter = require("./responsavel")
const atendimentoRouter = require("./atendimento")

router.use('/', petRouter)
router.use('/', responsavelRouter)
router.use('/', atendimentoRouter)

module.exports = router