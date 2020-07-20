'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = mongoose.model('users', new mongoose.Schema({
    email: {type : String, index: true},
    password: String,
    eth: {
        address: String,
        privatekey: String,
    },
    token: {type : String, index: true}
},{ collection: 'users', versionKey: false }));
 
async function save(user) {
    const ret = await new schema(user).save();
    return ret;
}

async function getUserFromEmail(email) {
    let user = await schema.findOne({'email':email});
    return user;
}

async function updateToken(email, token) {
    let user = await schema.findOneAndUpdate({'email':email});
    return user;
}

module.exports = {save, getUserFromEmail, updateToken};