// Importações de pacotes
const express = require("express")
const cors = require("cors")
const parser = require("body-parser")
const methodOverride = require("method-override")
const conn = require("./db/conn")
const routes = require("./routes/router")
const app = express()

// Iniciando o Cors
app.use(cors())

// Iniciando o express parser
app.use(parser.urlencoded({extended: false}))
app.use(parser.json())

// Iniciando o banco
conn()

// Iniciando o method-override
app.use(methodOverride('_method'))

// Iniciando as rotas
app.use('/api', routes)

// Iniciando o view engine
app.set('view engine', 'ejs')

// Listando porta da aplicação
app.listen(3000, () => {
    console.log("SERVER RODANDO! http://localhost:3000")
})