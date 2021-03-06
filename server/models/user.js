const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

// Define our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String,
    name: String,
    imageUrl: String,
    phone: String,
    role: String,
    facebookRegistration: Boolean,
    ///Admin features below
    companyNameSearch: { type: String, lowercase: true },
    companyName: String,
    startHour: String,
    endHour: String,
    monday: Object,
    tuesday: Object,
    wednesday: Object,
    thursday: Object,
    friday: Object,
    saturday: Object,
    sunday: Object,
    state: String,
    city: String,
    citySearch: { type: String, lowercase: true },
    streetName: String,
    number: String,
    additionalInfo: String,
    cep: String,
    serviceAtHome: Boolean,
    areasSelected: Array
})

//On save hook, encrypt password 
//Before saving a model, run this function (that is what .pre() right below means)!
userSchema.pre('save', function (next) {
    const user = this; //here it is getting access to the user model

    bcrypt.genSalt(10, function (err, salt) {
        if (err) { return next(err) }

        //here is where encryption happens
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) { return next(err) }

            user.password = hash;
            next();
        })

    })
})


userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) { return callback(err) }
        callback(null, isMatch)
    })
}


//Create the model class
const ModelClass = mongoose.model('user', userSchema)


//Export the model
module.exports = ModelClass;