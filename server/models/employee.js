const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    ownerId: String,
    name: String,
    imageUrl: String,
    role: String
})

//Create the model class
const ModelClass = mongoose.model('employees', employeeSchema)

//Export the model
module.exports = ModelClass;