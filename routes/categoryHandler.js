"use strict";

const Categorie = require('../models/categories')
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

//Actualizar categoría
async function updateCategory(req, res) {
    try {
        let newCategoryInfo = req.body;
        const categoryUUID = req.params.uuid;

        const existingCategory = await Categorie.findOne({ 
            uuidUserPropietary: categoryUUID
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

exports.getCategories = getCategories;
exports.getCategory = getCategory;
exports.createCategory = createCategory;