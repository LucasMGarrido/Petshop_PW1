const Atendimento = require("../models/Atendimento")
const Pet = require("../models/Pet")
const Responsavel = require("../models/Responsavel")

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

            await Atendimento.create(atendimento)

            // res.status(200).json({msg:"Atendimento criado com sucesso!", responseCreate})
            res.status(200).redirect('/api/atendimento')
        } catch (error) {
            console.log(`Erro: ${error}`)
        }
    },
    read: async (req, res) => {
        try {

            const resAtendimento = await Atendimento.find().populate('responsavel pet')
            const resPet = await Pet.find()
            const resResponsavel = await Responsavel.find()

            // res.json({msg:"Aqui está todos os atendimentos cadastrados!", responseRead})
            res.status(201).render("../views/atendimentoForm.ejs", {resAtendimento, resPet, resResponsavel})
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

            await Atendimento.findByIdAndDelete(id)

            res.status(200).redirect('/api/atendimento')
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

            await Atendimento.findByIdAndUpdate(id, atendimento)

            res.status(200).redirect('/api/atendimento')
        } catch (error) {
            console.log(`ERRO: ${error}`)
        }
    }
}

module.exports = atendimentoController