const { User } = require("../models/User")
const bcrypt = require('bcrypt')

const userController = {

    create: async (req, res) => {
    const { email } = req.body
        try {
            if(await User.findOne({email}))
                return res.status(400).send({error: 'Usuário já existe'})

           const user = await User.create(req.body)
           
           return res.send({user})

            res.status(201).json({msg:"User criado com sucesso!", responseCreate})
        } catch (error) {
            res.status(400).send({error: 'Cadastro de usuário falhou.'})
            console.log(`ERRO: ${error}`)
        }
    },
    authenticate: async (req, res)=>{
        const {email, senha} = req.body
        const user = await User.findOne({email}).select('+senha')

        if(!user){
            res.status(400).send({error: 'Usuário não encontrado.'})
        }

        if(!await bcrypt.compare(senha, user.senha)){
            res.status(400).send({error: 'Senha Inválida'})
        }
        
        
        res.send({ user })
    }
}

module.exports = userController