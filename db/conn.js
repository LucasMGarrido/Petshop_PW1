const mongoose  = require("mongoose")

const conn = async () => {
    try {
        mongoose.set('strictQuery', false)

        // Usar quando não tiver internet
        //await mongoose.connect(`mongodb://localhost:27017`)

        // ===================================================

        // Usar quando tiver internet
        await mongoose.connect(`mongodb+srv://sammiGabi:d3d3d3@cluster0.qchtace.mongodb.net/?retryWrites=true&w=majority`)

        console.log("BANCO OPERANDO")
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = conn
