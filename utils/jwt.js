const jwt = require('jsonwebtoken');
const property = require('../configs/property')

async function generateToken(payload) {
    return jwt.sign(payload, property.jwt.secret, property.jwt.options);
}

async function verifyToken(token) {
    return await jwt.verify(token, property.jwt.secret, property.jwt.options);
}


module.exports = {generateToken, verifyToken}