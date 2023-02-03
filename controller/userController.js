const { User } = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require("dotenv").config()

const userController = {

    create: async (req, res) => {
    const { email } = req.body
    console.log(email);
        try {
            if(await User.findOne({email}))
                return res.status(400).send({error: 'Usuário já existe'})

           const user = await User.create(req.body)

            res.status(201).json({msg:"User criado com sucesso!", user})
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
    
        const token = jwt.sign({user: email}, process.env.SECRET, { expiresIn: 300});
        // token sendo gerado, expira em 5 minutos

        res.cookie('token', token, { maxAge: 3600000, httpOnly: true, sameSite: 'Strict', secure: false})
        res.json({ auth: true, token: token })//autenticação feita
        
    },
    login: async (req,res) =>{
        res.render("../views/login.ejs")
    },
    cadastro: async(req,res) =>{
        res.render("../views/cadastro.ejs")
    }
}

module.exports = userController