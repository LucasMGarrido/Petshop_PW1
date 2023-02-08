const Responsavel = require("../models/Responsavel")

const responsavelController = {
    create: async (req, res) => {
        try {
            const responsavel = {
                nome: req.body.nome,
                cargo: req.body.cargo,
                telefone: req.body.telefone,
                email: req.body.email
            }

            const responseCreate = await Responsavel.create(responsavel)

            // res.status(201).json({msg:"Responsável criado com sucesso!", responseCreate})
            res.redirect('/api/responsavel')
        } catch (error) {
            console.log(`ERRO: ${error}`)
        }
    },
    read: async (req, res) => {
        try {
            const responseRead = await Responsavel.find()

            // res.json({msg:"Aqui está todos os responsáveis cadastrados!", responseRead})
            res.status(200).render("../views/responsavel.ejs", {responseRead: responseRead})
        } catch (error) {
            console.log(`ERRO: ${error}`)
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id

            const responsavel = {
                nome: req.body.nome,
                cargo: req.body.cargo,
                telefone: req.body.telefone,
                email: req.body.email,
            }

            const responseUpdate = await Responsavel.findByIdAndUpdate(id, responsavel)

            if(!responseUpdate){
                return res.status(404).json({msg:"Responsável não encontrado!"})
            }

            // res.status(200).json({msg:"Responsável atualizado com sucesso!", responseUpdate})
            res.redirect('/api/responsavel')
        } catch (error) {
            console.log(`ERRO: ${error}`)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id

            const responsavel = await Responsavel.findById(id)

            if(!responsavel){
                return res.status(404).json({msg:"Responsável não econtrado"})
            }

            const responseDelete = await Responsavel.findByIdAndDelete(id)

            // res.status(200).json({msg:"Responsável excluído com sucesso!", responseDelete})
            res.redirect('/api/responsavel')
        } catch (error) {
            console.log(`ERRO: ${error}`)
        }
    },
}

module.exports = responsavelController