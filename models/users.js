const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    uuidUser: {
        type: String,
        required: true,
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

const User = mongoose.model('user', userSchema);

module.exports = User;