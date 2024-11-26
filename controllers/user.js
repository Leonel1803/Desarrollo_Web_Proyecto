// controllers/user.js
"use strict";

const express = require('express');
const router = express.Router();
const utils = require('./utils');

const userHandler = require('../routes/userHandler');

router.route('/')
    .post((req, res) => userHandler.createUser(req, res))
    .get(utils.verifyToken, (req, res) => userHandler.getUsers(req, res));

router.route('/:usrName')
    .get(utils.verifyToken, (req, res) => userHandler.getUser(req, res));

router.route('/:uuid')
    .put((req, res) => userHandler.updateUser(req, res))
    .delete((req, res) => userHandler.deleteUser(req, res))

router.route('/login')
    .post((req, res) => userHandler.login(req, res))

module.exports = router;