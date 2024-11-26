const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const filePath = path.join(__dirname, '../configuration.json');

let keys = {};

(async function loadKeys() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        keys = JSON.parse(data);
    } catch (err) {
        console.error('Error al cargar las claves:', err);
        process.exit(1);
    }
})();

const userSchema = mongoose.Schema({
    uuidUser: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: false,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
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

userSchema.methods.generateToken = function(password, role) {
    let user = this;
    let payload = {_id: user.uuidUser, role: user.role};
    let options = { expiresIn: 60 * 60 }

    if (bcrypt.compareSync(password, user.password)) {
        try {
            if(role == 'ADMIN'){
                user.token = jwt.sign(payload, keys.AdminKEY, options);
                return user.token;
            }
            else{
                user.token = jwt.sign(payload, keys.UserKEY, options);
                return user.token;
            }
        } catch (err) {
            console.log(err);
        }
    }
}

const User = mongoose.model('user', userSchema);

module.exports = User;