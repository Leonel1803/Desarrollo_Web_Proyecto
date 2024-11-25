"use strict";

const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const filePath = path.join(__dirname, '../configuration.json');

let keys = {};

(async function loadKeys() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        keys = JSON.parse(data);
    } catch (err) {
        console.error('Error al cargar las claves:', err);
        process.exit(1);
    }
})();


function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16 | 0;
        let v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function verifyToken (req, res, next){
    const token = req.get("x-auth");
    const role = req.get("x-role");
    if (token == undefined) {
        return res.status(403).send("Missing token");
    }

    if(token == "TestToken") return next(); //Borrar al subir a PRODUCCIÓN

    if(role == 'ADMIN'){
        jwt.verify(token, keys.AdminKEY, (err, decoded) => {
            if (err) return res.status(401).send("Invalid Token");
    
            req.userInfo = decoded;
            return next();
        });
    }
    else{
        jwt.verify(token, keys.UserKEY, (err, decoded) => {
            if (err) return res.status(401).send("Invalid Token");
    
            req.userInfo = decoded;
            return next();
        });
    }
};

exports.verifyToken = verifyToken;
exports.generateUUID = generateUUID;