const Service = require('../models/service')

exports.fetchServices = async function (req, res) {
    const id = req.query.id
    try {
        const services = await Service.find({ ownerId: id }).sort({ isActive: -1, serviceName: 1 })
        console.log('services', services)
        res.send(services)
    } catch (err) {
        console.log(err)
        res.send('Error while fetching service:' + err)
    }

}

exports.addServices = async function (req, res) {
    const service = req.body
    try {
        Service.create(service)
        res.send('Service added successfully')
    } catch (err) {
        console.log(err)
        res.send('Error while adding service:' + err)
    }

}

exports.activateService = async function (req, res) {
    const data = req.body
    try {
        await Service.update({ _id: data.serviceId }, { $set: { isActive: true } })
        res.send('Service activated successfully')
    } catch (err) {
        console.log(err)
        res.send('Error while activating service:' + err)
    }
}

exports.deactivateService = async function (req, res) {
    const data = req.body
    try {
        await Service.update({ _id: data.serviceId }, { $set: { isActive: false } })
        res.send('Service deactivated successfully')
    } catch (err) {
        console.log(err)
        res.send('Error while deactivating service:' + err)
    }
}

exports.deleteService = async function (req, res) {
    const serviceId = req.query.serviceId
    try {
        await Service.remove({ _id: serviceId})
        res.send('Service deleted successfully')
    } catch (err) {
        console.log(err)
        res.send('Error while deleting service:' + err)
    }
}