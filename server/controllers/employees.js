const Employee = require('../models/employee')

exports.addEmployee = async function (req, res) {
    const employee = req.body

    if (!employee) {
        return res.send('Employee data not added')
    }
    try {
        const result = await Employee.create(employee)
        res.send(result)
    } catch (err) {
        console.log(err)
        res.send('Employee not added')
    }
}

exports.fetchEmployees = async function (req, res) {
    const ownerId = req.query.ownerId

    if (!ownerId) {
        return res.send('OwnerId not provided')
    }

    try {
        const result = await Employee.find({ ownerId })
        res.send(result)
    } catch (err) {
        console.log(err)
        res.send('Error fetching employees: ' + err)
    }
}

exports.fetchEmployee = async function (req, res) {
    const employeeId = req.query.employeeId

    if (!employeeId) {
        return res.send('Employee ID not provided')
    }

    try {
        const result = await Employee.findOne({ _id: employeeId })
        res.send(result)
    } catch (err) {
        console.log(err)
        res.send('Error fetching employee: ' + err)
    }
}