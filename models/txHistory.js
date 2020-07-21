'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = mongoose.model('txhistory', new mongoose.Schema({
    userKey: {type : String, index: true},
    toAddr: String,
    blockHash: String,
    blockNum: Number,
    txHash: String,
    txNum: Number,
    amount: String,
    symbol:String

},{ collection: 'txhistory', versionKey: false }));
 
async function save(txInfo) {
    const ret = await new schema(txInfo).save();
    return ret;
}

async function findAll(userKey) {
    let user = await schema.find({'userKey':userKey});
    return user;
}


module.exports = {save, findAll};