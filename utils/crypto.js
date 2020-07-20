const crypto = require("crypto-js");

function encryptAES(data, key) {
    return crypto.AES.encrypt(data, key);
}

function decryptAES(data, key) {
    return crypto.AES.decrypt(data, key).toString(crypto.enc.Utf8);
}

function sha256Hash(data) {
    if(typeof data === 'object') {
        data = JSON.stringify(data);
    }
    return crypto.SHA256(data).toString().toUpperCase();
}

module.exports.enc = encryptAES;
module.exports.dec = decryptAES;
module.exports.sha256Hash = sha256Hash;