"use strict";

const express = require('express');
const router = express.Router();
const utils = require('./utils');

const userHandler = require('../routes/userHandler');

router.route('/')
    .post((req, res) => userHandler.createUser(req, res))
    .get(utils.verifyToken, (req, res) => userHandler.getUsers(req, res));

router.route('/login')
    .post((req, res) => userHandler.login(req, res))

module.exports = router;