const router = require("express").Router()
const petRouter = require("./pet")
const responsavelRouter = require("./responsavel")
const atendimentoRouter = require("./atendimento")
const userRouter = require("./user")

router.use('/', petRouter)
router.use('/', responsavelRouter)
router.use('/', atendimentoRouter)
router.use('/', userRouter)

module.exports = router