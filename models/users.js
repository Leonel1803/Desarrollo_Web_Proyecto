const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let privateKey = process.env.TOKEN_KEY;

const userSchema = mongoose.Schema({
    uuidUser: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    employeeNumber: {
        type: Number,
        required: false
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        required: true,
    },
});

userSchema.pre('save', function(next) {
    let user = this;
    user.password = bcrypt.hashSync(user.password, 10);
    next();
})

userSchema.methods.generateToken = function(password) {
    let user = this;
    let payload = {_id: user.uuidUser, role: user.role};
    let options = { expiresIn: 60 * 60 }
    if (bcrypt.compareSync(password, user.password)) {
        try {
            user.token = jwt.sign(payload, privateKey, options);
            return user.token;
        } catch (err) {
            console.log(err);
        }
    }
}

const User = mongoose.model('user', userSchema);

module.exports = User;