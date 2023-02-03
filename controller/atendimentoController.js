const Atendimento = require("../models/Atendimento")

const atendimentoController = {
    create: async (req, res) => {
        try {
            const atendimento = {
                tipo: req.body.tipo,
                responsavel: req.body.responsavel,
                descricao: req.body.descricao,
                data: req.body.data,
                hora: req.body.hora,
                pet: req.body.pet,
            }

            const responseCreate = await Atendimento.create(atendimento)

            // res.status(200).json({msg:"Atendimento criado com sucesso!", responseCreate})
            res.status(200).render("../views/atendimentoForm.ejs", {responseCreate})
        } catch (error) {
            console.log(`Erro: ${error}`)
        }
    },
    read: async (req, res) => {
        try {
            const responseRead = await Atendimento.find().populate('responsavel pet')

            // res.json({msg:"Aqui está todos os atendimentos cadastrados!", responseRead})
            res.status(201).render("../views/atendimentoForm.ejs", {responseRead})
        } catch (error) {
            console.log(`ERRO: ${error}`)
        }
    },
    readOne: async (req, res) => {
        try {
            const id = req.params.id

            const responseRead = await Atendimento.findById(id).populate('responsavel pet')

            if (!responseRead) {
                return res.status(404).json({msg:"Atendimento não encontrado"})
            }

            res.json({responseRead})
        } catch (error) {
            console.log(`ERRO: ${error}`)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id
            
            const atendimento = Atendimento.findById(id)

            if (!atendimento) {
                return res.status(404).json({msg:"Atendimento não encontrado!"})
            }

            const responseDelete = await Atendimento.findByIdAndDelete(id)

            res.status(200).json({msg:"Atendimento excluído com sucesso!", responseDelete})
        } catch (error) {
            console.log(`ERRO: ${error}`)
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id
            const atendimento = {
                tipo: req.body.tipo,
                responsavel: req.body.responsavel,
                descricao: req.body.descricao,
                data: req.body.data,
                hora: req.body.hora,
                pet: req.body.pet,
            }

            const atendimentoExiste = await Atendimento.findById(id)

            if (!atendimentoExiste) {
                return res.status(404).json({msg:"Atendimento não encontrado!"})
            }

            const responsetUpdate = await Atendimento.findByIdAndUpdate(id, atendimento)

            res.status(200).json({msg:"Atendiemnto atualizado com sucesso!", responsetUpdate})
        } catch (error) {
            console.log(`ERRO: ${error}`)
        }
    }
}

module.exports = atendimentoController