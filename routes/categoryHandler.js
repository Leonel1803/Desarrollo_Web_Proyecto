"use strict";

const Categorie = require('../models/categories')
const utils = require('../controllers/utils');

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

exports.createCategory = createCategory;