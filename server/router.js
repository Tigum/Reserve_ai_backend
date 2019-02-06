const Authentication = require('./controllers/authentication')
const Service = require('./controllers/services')
const Employee = require('./controllers/employees')
const passportService = require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = function (app) {
    //Authentication
    app.get('/loadUser', Authentication.loadUser)
    app.get('/checkIfUserExistsByEmail', Authentication.checkIfUserExistsByEmail)


    app.post('/signin', requireSignin, Authentication.signin)
    app.post('/signup', Authentication.signup)
    app.post('/uploadPicture', Authentication.uploadPicture)
    app.post('/admSignup', Authentication.admSignup)


    //Services
    app.get('/fetchServices', Service.fetchServices)

    app.post('/addService', Service.addServices)
    app.post('/activateService', Service.activateService)
    app.post('/deactivateService', Service.deactivateService)

    app.delete('/deleteService', Service.deleteService)


    //Employees
    app.get('/fetchEmployees', Employee.fetchEmployees)
    app.get('/fetchEmployee', Employee.fetchEmployee)

    app.post('/addEmployee', Employee.addEmployee)
}