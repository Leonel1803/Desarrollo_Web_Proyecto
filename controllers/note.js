// controllers/note.js
"use strict";

const express = require('express');
const router = express.Router();

const noteHandler = require('../routes/noteHandler');

router.route('/')
    .post((req, res) => noteHandler.createNote(req, res))
    .get((req, res) => noteHandler.getNotes(req, res));

router.route('/:nteName')
    .get((req, res) => noteHandler.getNote(req, res))

router.route('/:uuid')
    .put((req, res) => noteHandler.updateNote(req, res))
    .delete((req, res) => noteHandler.deleteNote(req, res))

router.route('/getByUUID/:uuid')
    .get((req, res) => noteHandler.getNotesByCatalogUUID(req, res));

module.exports = router;