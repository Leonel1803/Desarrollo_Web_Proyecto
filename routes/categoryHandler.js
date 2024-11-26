"use strict";

const Categorie = require('../models/categories');
const Note = require('../models/notes');
const utils = require('../controllers/utils');

//Mandar todas la categorias
async function getCategories(req, res) {
    try {
        const categories = await Categorie.find();

        return res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
            error: error.message,
        });
    }
}

//Buscar categorías por nombre
async function getCategory(req, res) {
    try {
        const categoryName = new RegExp(req.params.catName, 'i');

        const categories = await Categorie.find({ categoryName: categoryName });

        return res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
            error: error.message,
        });
    }
}

//Buscar categorías por UUID del usuario
async function getCategoriesByUserUUID(req, res) {
    try {
        const userUUID = req.params.uuid;

        const categories = await Categorie.find({ uuidUserPropietary: userUUID });

        return res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
            error: error.message,
        });
    }
}

//Crear nueva categoría
async function createCategory(req, res) {
    try {
        let newCategoryVerify = req.body;

        const existingCategory = await Categorie.findOne({ 
            categoryName: newCategoryVerify.categoryName,
            uuidUserPropietary: newCategoryVerify.uuidUserPropietary
        });
        if (existingCategory) {
            return res.status(409).json({
                success: false,
                message: 'Ya tienes registrada una categoría con ese nombre',
            });
        }

        const newCategory = new Categorie({
            ...newCategoryVerify,
            uuidCategory: utils.generateUUID(),
        });

        const category = await newCategory.save();
        return res.status(201).json({
            success: true,
            message: `¡La categoría ${category.categoryName} fue creada!`,
            data: category
        });
    } catch (error) {
        console.error('Error al crear la categoría:', error);

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
            error: error.message,
        });
    }
}

//Actualizar categoría
async function updateCategory(req, res) {
    try {
        const newCategoryName = req.body.categoryName;
        const categoryUUID = req.params.uuid;

        const existingCategory = await Categorie.findOne({ 
            uuidCategory: categoryUUID
        });

        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                message: 'No hay una categoría registrada con el ID proporcionado',
            });
        }

        existingCategory.categoryName = newCategoryName;

        const category = await existingCategory.save();
        return res.status(200).json({
            success: true,
            message: `¡La categoría ${category.categoryName} fue actualizada!`,
            data: category
        });
    } catch (error) {
        console.error('Error al catualizar la categoría:', error);

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
            error: error.message,
        });
    }
}

//Eliminar categoría
async function deleteCategory(req, res) {
    try {
        const categoryUUID = req.params.uuid;

        const existingCategory = await Categorie.findOne({ 
            uuidCategory: categoryUUID 
        });

        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró una categoría con el ID proporcionado.',
            });
        }

        await Note.deleteMany({ uuidCategoryPropietary: categoryUUID });
        await Categorie.deleteOne({ uuidCategory: categoryUUID });

        return res.status(200).json({
            success: true,
            message: `¡La categoría con el ID '${categoryUUID}' fue eliminada exitosamente!`,
        });
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor.',
            error: error.message,
        });
    }
}

exports.getCategories = getCategories;
exports.getCategory = getCategory;
exports.getCategoriesByUserUUID = getCategoriesByUserUUID;
exports.createCategory = createCategory;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
