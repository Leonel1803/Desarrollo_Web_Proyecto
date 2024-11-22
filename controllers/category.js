"use strict";

const express = require('express');
const router = express.Router();

const categoryHandler = require('../routes/categoryHandler');

router.route('/')
    .post((req, res) => categoryHandler.createCategory(req, res))
    .get((req, res) => categoryHandler.getCategories(req, res));

router.route('/:catName')
    .get((req, res) => categoryHandler.getCategory(req, res))

router.route('/:uuid')
    .put((req, res) => userHandler.getUser(req, res));

module.exports = router;