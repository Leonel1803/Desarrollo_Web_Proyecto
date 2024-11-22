"use strict";

const express = require('express');
const router = require('./controllers/router');
const path = require("path")
const app = express();
const port = 3000;
const mongoose = require('mongoose');

// const mongoDB = 'mongodb://localhost:27017/NoteAPP';
const mongoDB = 'mongodb+srv://leonrivera2003:Molotov_1803@noteapp.zxskc.mongodb.net/?retryWrites=true&w=majority&appName=NoteAPP';
process.env.TOKEN_KEY = "NotiAPP01516"
process.env.SECOND_TOKEN_KEY = "AdminNotiAPP01516_SUPER";

mongoose.connect(mongoDB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(router);

app.use(express.static(path.join(__dirname, 'views')));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
})