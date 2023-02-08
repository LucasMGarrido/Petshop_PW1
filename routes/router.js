const router = require("express").Router()
const petRouter = require("./pet")
const responsavelRouter = require("./responsavel")
const atendimentoRouter = require("./atendimento")
const userRouter = require("./user")

router.get('/', (req, res) => {res.render('../views/index.ejs')})
router.get('/erro', (req, res) => {res.render('../views/erro.ejs')})
router.use('/', petRouter)
router.use('/', responsavelRouter)
router.use('/', atendimentoRouter)
router.use('/', userRouter)

module.exports = router