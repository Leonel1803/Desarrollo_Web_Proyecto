"use strict";

const express = require('express');
const router = express.Router();

const categoryHandler = require('../routes/categoryHandler');

router.route('/')
    .post((req, res) => categoryHandler.createCategory(req, res));

module.exports = router;