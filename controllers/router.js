"use strict"

const express = require('express');
const router = express.Router();
const path = require('path'); 
const userRouter = require('./user');
const categoryRouter = require('./category');
const utils = require('./utils');
// const productRouter = require('../routes/products');
// const adminRouter = require('../routes/admin_products')

//Asigna rutas base a cada route
// router.use('/products', productRouter);
// router.use('/admin/products', validateAdmin, adminRouter); //Tiene validador

router.use('/api/usuarios', userRouter);
router.use('/api/categorias', utils.verifyToken, categoryRouter);

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

router.get('/notes', utils.verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'notes.html'));
});

router.get('/notebook/:id', utils.verifyToken, (req, res) => {
    const notebookId = req.params.id;
    res.sendFile(path.join(__dirname, '..', 'views', 'notebook.html'));
});

module.exports = router;

//Middleware para que funcione