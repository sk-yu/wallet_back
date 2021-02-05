'use strict';
const mongoose = require('mongoose');

const schema = mongoose.model('users', new mongoose.Schema({
    email: {type : String, index: true},
    password: String,
    keys: [{
        address: String,
        privatekey: String,
    }],
    token: {type : String, index: true}
},{ collection: 'users', versionKey: false }));
 
async function save(user) {
    const ret = await new schema(user).save();
    return ret;
}

async function addAddress(email, key) {
    // const ret = await schema.updateOne(
    const ret = await schema.findOneAndUpdate(
        {email:email},
        {$addToSet: {keys:key}},
        {new:true}
        )
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

module.exports = {save, addAddress, getUserFromEmail, updateToken};