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

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ userName: newUserVerify.userName });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'El usuario ya está registrado',
            });
        }

        // Crear el nuevo usuario
        const newUser = new User({
            ...newUserVerify,
            uuidUser: utils.generateUUID(),
        });

        // Guardar el usuario en la base de datos
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

exports.getUsers = getUsers;
exports.createUser = createUser;