"use strict";

const User = require('../models/users')
const Categorie = require('../models/categories');
const Note = require('../models/notes');
const utils = require('../controllers/utils');

//Mandar todos los usuarios
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

//Buscar usuario por nombre
async function getUser(req, res) {
    try {
        const userName = new RegExp(req.params.usrName, 'i');

        const users = await User.find({ userName: userName });

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

//Crear nuevo usuario
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

//Actualizar usuario
async function updateUser(req, res) {
    try {
        const newUserName = req.body.userName;
        const userUUID = req.params.uuid;

        const existingUser = await User.findOne({ 
            uuidUser: userUUID
        });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'No hay un usuario registrado con el ID proporcionado',
            });
        }

        existingUser.userName = newUserName;

        const user = await existingUser.save();
        return res.status(200).json({
            success: true,
            message: `¡El usuario ha cambiado su nombre a ${user.userName}!`,
            data: user
        });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
            error: error.message,
        });
    }
}

//Eliminar usuario
async function deleteUser(req, res) {
    try {
        const userUUID = req.params.uuid;

        const existingUser = await User.findOne({ 
            uuidUser: userUUID
        });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'No hay un usuario registrado con el ID proporcionado',
            });
        }

        const userCategories = await Categorie.find({ 
            uuidUserPropietary: userUUID
        });

        await userCategories.forEach(category => {
            Note.deleteMany({ uuidCategoryPropietary: category.uuidCategory });
        });

        await Categorie.deleteMany({ uuidUserPropietary: userUUID });
        await User.deleteOne({ uuidUser: userUUID });

        return res.status(200).json({
            success: true,
            message: `¡El usuario con el ID '${userUUID}' fue eliminado exitosamente!`,
        });
    } catch (error) {
        console.error('Error al eliminar al usuario:', error);

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
        const role = req.body.role;

        User.findOne({userName: `${userName}`})
        .then(user => {
            let token = user.generateToken(password, role);
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
exports.getUser = getUser;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.login = login;