// routes/noteHandler.js
"use strict";

const Note = require('../models/notes');
const utils = require('../controllers/utils');

//Mandar todas la notas
async function getNotes(req, res) {
    try {
        const notes = await Note.find();

        return res.status(200).json({
            success: true,
            data: notes,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
            error: error.message,
        });
    }
}

//Buscar notas por nombre
async function getNote(req, res) {
    try {
        const noteName = new RegExp(req.params.nteName, 'i');

        const notes = await Note.find({ noteName: noteName });

        return res.status(200).json({
            success: true,
            data: notes,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
            error: error.message,
        });
    }
}

//Buscar notas por nombre
async function getNotesByCatalogUUID(req, res) {
    try {
        const noteUUID = req.params.uuid;

        const notes = await Note.find({ uuidCategoryPropietary: noteUUID });

        return res.status(200).json({
            success: true,
            data: notes,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
            error: error.message,
        });
    }
}

//Crear nueva nota
async function createNote(req, res) {
    try {
        let newNoteVerify = req.body;

        const existingNote = await Note.findOne({ 
            noteName: newNoteVerify.noteName,
            uuidCategoryPropietary: newNoteVerify.uuidCategoryPropietary
        });
        if (existingNote) {
            return res.status(409).json({
                success: false,
                message: 'Ya tienes registrada una nota con ese nombre dentro de esta categoría',
            });
        }

        const newNote = new Note({
            ...newNoteVerify,
            uuidNote: utils.generateUUID(),
        });

        const note = await newNote.save();
        return res.status(201).json({
            success: true,
            message: `¡La nota ${note.noteName} fue creada!`,
            data: note
        });
    } catch (error) {
        console.error('Error al crear la nota:', error);

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
            error: error.message,
        });
    }
}

//Actualizar nota
async function updateNote(req, res) {
    try {
        const updatedNote = req.body;
        const noteUUID = req.params.uuid;

        const existingNote = await Note.findOne({ 
            uuidNote: noteUUID
        });

        if (!existingNote) {
            return res.status(404).json({
                success: false,
                message: 'No hay una nota registrada con el ID proporcionado',
            });
        }

        if (existingNote.noteName !== updatedNote.noteName && updatedNote.noteName?.trim()) {
            existingNote.noteName = updatedNote.noteName;
        }
        
        if (existingNote.noteContent !== updatedNote.noteContent && updatedNote.noteContent?.trim()) {
            existingNote.noteContent = updatedNote.noteContent;
        }

        if (existingNote.portraitNoteImage !== updatedNote.portraitNoteImage && updatedNote.portraitNoteImage?.trim()) {
            existingNote.portraitNoteImage = updatedNote.portraitNoteImage;
        }

        const note = await existingNote.save();
        return res.status(200).json({
            success: true,
            message: `¡La nota ${note.noteName} fue actualizada!`,
            data: note
        });
    } catch (error) {
        console.error('Error al catualizar la nota:', error);

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
            error: error.message,
        });
    }
}

//Eliminar nota
async function deleteNote(req, res) {
    try {
        const noteUUID = req.params.uuid;

        const existingNote = await Note.findOne({ 
            uuidNote: noteUUID 
        });

        if (!existingNote) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró una nota con el ID proporcionado.',
            });
        }

        await Note.deleteOne({ uuidNote: noteUUID });

        return res.status(200).json({
            success: true,
            message: `¡La note con el ID '${noteUUID}' fue eliminada exitosamente!`,
        });
    } catch (error) {
        console.error('Error al eliminar la nota:', error);

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
            error: error.message,
        });
    }
}

exports.getNotes = getNotes;
exports.getNote = getNote;
exports.getNotesByCatalogUUID = getNotesByCatalogUUID;
exports.createNote = createNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;