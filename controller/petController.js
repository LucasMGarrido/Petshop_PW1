const { Pet } = require("../models/Pet")

const petController = {

    create: async (req, res) => {
        try {
            const pet = {
                nome: req.body.nome,
                tutor: req.body.tutor,
                telefone: req.body.telefone,
                endereco: req.body.endereco,
            }

            const responseCreate = await Pet.create(pet)

            // res.status(201).json({msg:"Pet criado com sucesso!", responseCreate})
            res.status(200).redirect("/api/pet")
        } catch (error) {
            console.log(`ERRO: ${error}`)
        }
    },
    read: async (req, res) => {
        try {
            const responseRead = await Pet.find()

            res.json({msg:"Aqui está todos os pets cadastrados!", responseRead})
            // res.status(201).render("../views/pet.ejs", {responseRead: responseRead})
        } catch (error) {
            console.log(`ERRO: ${error}`)
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id

            const pet = await Pet.findById(id)

            if(!pet){
                return res.status(404).json({msg:"Pet não econtrado"})
            }

            const responseDelete = await Pet.findByIdAndDelete(id)

            res.status(200).json({msg:"Pet excluído com sucesso!", responseDelete})
        } catch (error) {
            console.log(`ERRO: ${error}`)
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id

            const pet = {
                nome: req.body.nome,
                tutor: req.body.tutor,
                telefone: req.body.telefone,
                endereco: req.body.endereco,
            }

            const responseUpdate = await Pet.findByIdAndUpdate(id, pet)

            if(!responseUpdate){
                return res.status(404).json({msg:"Pet não encontrado!"})
            }

            res.status(200).json({msg:"Pet atualizado com sucesso!", responseUpdate})
        } catch (error) {
            console.log(`ERRO: ${error}`)
        }
    },
}

module.exports = petController