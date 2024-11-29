// controllers/saveNote.js
"use strict";

const fs = require('fs');
const path = require('path');
const Note = require('../models/notes'); // Asegúrate de que la ruta sea correcta
const utils = require('./utils'); // Asegúrate de que la ruta sea correcta

const saveNote = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            success: false,
            message: 'Faltan el título o el contenido de la nota.'
        });
    }

    // Asignar un valor temporal a req.userInfo para pruebas
    if (!req.userInfo) {
        req.userInfo = { _id: 'test-user-id' }; // Reemplaza esto con un valor válido
    }

    // Guardar en MongoDB
    try {
        const newNote = new Note({
            uuidNote: utils.generateUUID(),
            noteName: title,
            noteContent: content,
            uuidCategoryPropietary: req.userInfo._id // Asegúrate de que este valor esté correctamente definido
        });

        await newNote.save();
    } catch (err) {
        console.error('Error al guardar la nota en MongoDB:', err);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor al guardar en MongoDB.',
            error: err.message
        });
    }

    // Guardar en archivo
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    const filePath = path.join(uploadsDir, `${title}.txt`);

    // Crear el directorio 'uploads' si no existe
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
    }

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error('Error al guardar la nota en archivo:', err);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor al guardar en archivo.',
                error: err.message
            });
        }

        console.log(`Archivo guardado en ${filePath}`);
        return res.status(200).json({
            success: true,
            message: 'Nota guardada con éxito.'
        });
    });
};

module.exports = saveNote;