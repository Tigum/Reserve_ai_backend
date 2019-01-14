const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config')

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
    //User authenticated and return token here
    res.send({ token: tokenForUser(req.user) })
}

exports.signup = function (req, res, next) {
    const userInfo = req.body;

    //See if a user with a given email exists
    User.findOne({ email: userInfo.email }, function (err, existingUser) {
        if (err) { return next(err) }

        if (!userInfo.email || !userInfo.password || !userInfo.name || !userInfo.phone) {
            return res.status(422).send({ error: 'You must provide an email and password' })
        }
        // If a user with an email already exists, return an error
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' })
        }

        //If a user with an email does NOT exist, create new user and sabe record
        const user = new User({
            email: userInfo.email,
            password: userInfo.password,
            role: 'client',
            imageUrl: 'N/A',
            facebookRegistration: false,
            phone: userInfo.phone
        })

        user.save(function (err) {
            if (err) { return next(err) }

            //Respond to request indicating the user was created
            res.json({ token: tokenForUser(user) })
        })
    })
}

exports.uploadPicture = function (req, res, next) {
    const imageUrl = req.body.imageUrl
    const userId = req.body.userId

    User.findOne({ _id: userId }, function (err, user) {
        if (err) { return next(err) }

        if (!user) {
            return res.status(422).send({ error: 'User does not exist' })
        }

        User.update({ _id: userId }, { $set: { imageUrl: imageUrl } })

        res.send({ imageUrl: imageUrl })
    })

}