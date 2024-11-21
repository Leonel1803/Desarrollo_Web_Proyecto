"use strict";

const User = require('../models/users')
const utils = require('../controllers/utils');

async function getUsers(req, res) {
    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
            error: error.message,
        });
    }
}

async function createUser(req, res) {
    try {
        let newUserVerify = req.body;

        const existingUser = await User.findOne({ userName: newUserVerify.userName });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'El usuario ya está registrado',
            });
        }

        const newUser = new User({
            ...newUserVerify,
            uuidUser: utils.generateUUID(),
        });

        const user = await newUser.save();
        return res.status(201).json({
            success: true,
            message: `¡El usuario ${user.userName} fue creado!`,
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
            error: error.message,
        });
    }
}

async function login(req, res) {
    try {
        const userName = req.body.userName;
        const password = req.body.password;

        User.findOne({userName: `${userName}`})
        .then(user => {
            let token = user.generateToken(password);
            console.log(token)
            if (token != undefined) {
                res.status(200)
                res.set('Content-Type', 'text/plain; charset=utf-8');
                res.send(token);
            } else {
                res.status(404);            
                res.set('Content-Type', 'text/plain; charset=utf-8');
                res.send(`Usuario o contraseña incorrecta`);
            }
        })
        .catch(err => {
            res.status(404);            
            res.set('Content-Type', 'text/plain; charset=utf-8');
            res.send(`Usuario o contraseña incorrecta`);
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
            error: error.message,
        });
    }
}

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.login = login;