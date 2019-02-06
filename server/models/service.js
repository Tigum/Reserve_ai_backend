const mongoose = require('mongoose')
const Schema = mongoose.Schema

const serviceSchema = new Schema({
    ownerId: String,
    employeesSelected: Array,
    serviceDescription: String,
    serviceDuration: Number,
    serviceName: String,
    servicePrice: Number,
    isActive: Boolean
})

//Create the model class
const ModelClass = mongoose.model('services', serviceSchema)

//Export the model
module.exports = ModelClass;