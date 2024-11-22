"use strict";

const jwt = require("jsonwebtoken");

const privateKey = process.env.TOKEN_KEY;
const privateKeyAdmin = process.env.SECOND_TOKEN_KEY;

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16 | 0;
        let v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const verifyToken = (req, res, next) => {
    const token = req.get("x-auth");
    const role = req.get("x-auth-role");
    if (token == undefined) {
        return res.status(403).send("Missing token");
    }

    if(token == "TestToken") return next(); //Borrar al subir a PRODUCCIÓN

    if(role == 'ADMIN'){
        jwt.verify(token, privateKeyAdmin, (err, decoded) => {
            if (err) return res.status(401).send("Invalid Token");
    
            req.userInfo = decoded;
            return next();
        });
    }
    else{
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err) return res.status(401).send("Invalid Token");
    
            req.userInfo = decoded;
            return next();
        });
    }
};

exports.verifyToken = verifyToken;
exports.generateUUID = generateUUID;