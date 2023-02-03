const { User } = require("../models/User")
const bcrypt = require('bcrypt')

const userController = {

    create: async (req, res) => {
    const { email } = req.body
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
        
        res.send(userExist)
    }
}

module.exports = userController