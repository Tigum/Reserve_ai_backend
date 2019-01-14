const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = function (app) {
    app.get('/loadUser', Authentication.loadUser)
    app.get('/checkIfUserExistsByEmail', Authentication.checkIfUserExistsByEmail)


    app.post('/signin', requireSignin, Authentication.signin)
    app.post('/signup', Authentication.signup)
    app.post('/uploadPicture', Authentication.uploadPicture)
}