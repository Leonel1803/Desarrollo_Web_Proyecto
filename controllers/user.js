"use strict";

const express = require('express');
const router = express.Router();

const userHandler = require('../routes/userHandler');

router.route('/')
    .post((req, res) => userHandler.createUser(req, res))
    .get((req, res) => userHandler.getUsers(req, res));

module.exports = router;