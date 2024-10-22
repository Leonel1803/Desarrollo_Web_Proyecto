"use strict";

const express = require('express');
const router = require('./controllers/router');
const path = require("path")
const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

app.use(express.static(path.join(__dirname, 'views')));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
})