const { User } = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require("dotenv").config()

const userController = {

    create: async (req, res) => {
    const dados = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    }
    const { email } = req.body
        try {
            if(await User.findOne({email})){
                return res.status(400).send({error: 'Usuário já existe'})
            }

            await User.create(dados)

            res.redirect('/api/sigin')
        } catch (error) {
            res.status(400).send({error: 'Cadastro de usuário falhou.'})
            console.log(`ERRO: ${error}`)
        }
    },
    authenticate: async (req, res)=>{
        const {email, senha} = req.body
        const user = await User.findOne({email}).select('+senha')

        if(!user){
            return res.status(400).send({error: 'Usuário não encontrado.'})
        }

        const userExist = await bcrypt.compare(senha, user.senha)

        if(!userExist){
            return res.status(400).send({error: 'Senha Inválida'})
        }
    
        const token = jwt.sign({user: email}, process.env.SECRET, { expiresIn: 3000});

        res.cookie('token', token, { maxAge: 3600000, httpOnly: true, sameSite: 'Strict', secure: false})
        res.redirect('/api/')
        
    },
    login: async (req,res) =>{
        res.render("../views/login.ejs")
    },
    cadastro: async(req,res) =>{
        res.render("../views/cadastro.ejs")
    },
    logout: async (req, res) => {
        const { token } = req.cookies
        res.cookie('token', token, {maxAge: 10})
        res.redirect("/api/singin")
    }
}

module.exports = userController