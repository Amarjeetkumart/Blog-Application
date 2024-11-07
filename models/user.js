//const { createHma, randomBytes } = require('crypto'); 
const crypto = require('crypto'); 
//imoport for crypto
const { Schema, model } = require('mongoose');
//import for mongoose
const { createTokenForUser } = require("../services/authentication");
//import for createTokenForUser
//creating a schema for the user
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: '/images/default.png'
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    },
}, { timestamps: true });
//pre save hook
userSchema.pre('save', function(next) {
    const user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    const salt = crypto.randomBytes(32).toString('hex');
    const hashPassword = crypto.createHmac('sha256', salt).update(user.password).digest('hex');

    user.salt = salt;
    user.password = hashPassword;

    next();
});
//authenticate method
userSchema.static('authenticate', async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User not found');

    const salt = user.salt;
    const hashPassword = user.password;

    const userProvidedPassword = crypto.createHmac('sha256', salt).update(password).digest('hex');

    if (hashPassword !== userProvidedPassword) throw new Error('Password not matched');

    // return {...user, password: undefined, salt: undefined };
    const token = createTokenForUser(user);
    return token;
});
//creating a model for the user
const User = model('user', userSchema);
//exporting the model for the user
module.exports = User;