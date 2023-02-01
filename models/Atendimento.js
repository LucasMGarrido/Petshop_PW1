const mongoose = require("mongoose")
const { petSchema } = require("./Pet")
const { responsavelSchema} = require("./Responsavel")

const atendimentoSechema = new mongoose.Schema({
    tipo:{
        type: String,
        required: true,
    },
    responsavel:{
        type:[responsavelSchema],
    },
    descricao:{
        type: String,
        required: true,
    },
    horario:{
        data:{
            type: Date,
            required: true,
        },
        hora:{
            type: Date,
            required: true,
        }
    },
    pet:{
        type:[petSchema]
    }
})

const Atendimento = mongoose.model('Atendimento', atendimentoSechema)

module.exports = Atendimento