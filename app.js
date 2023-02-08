// Importações de pacotes
const express = require("express")
const cors = require("cors")
const parser = require("body-parser")
const methodOverride = require("method-override")
const conn = require("./db/conn")
const routes = require("./routes/router")
const app = express()
const cookieParser = require('cookie-parser');
const flash = require("connect-flash")

// Iniciando o Cors
app.use(
    cors({
        credentials: true,
        methods: 'GET, PUT, POST, OPTIONS, DELETE'
    })
)   

// Iniciando o express parser
app.use(parser.urlencoded({extended: true}))
app.use(parser.json())
app.use(cookieParser());

// Iniciando o banco
conn()

// Iniciando o flash
app.use(flash())

// Iniciando o method-override
app.use(methodOverride('_method'))

// Iniciando as rotas
app.use('/api', routes)

// Iniciando o view engine
app.set('view engine', 'ejs')

// Listando porta da aplicação
app.listen(3001, () => {
    console.log("SERVER RODANDO! http://localhost:3000/api")
})