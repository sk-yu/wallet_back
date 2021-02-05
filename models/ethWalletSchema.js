'use strict';
const mongoose = require('mongoose');
require('mongoose-long')(mongoose);

const schema = mongoose.model('ethWallets', new mongoose.Schema({
    userId: {type : String, index: true},
    address: String,
    token:String,
    symbol: String,
    decimal:Number
},{ collection: 'ethWallets', versionKey: false }));
 
async function exists(filter) {
    const ret = await schema.exists(filter);
    return ret;
}

async function save(tokenInfo) {
    const ret = await new schema(tokenInfo).save();
    return ret;
}

async function getWalletInfos(userId, address) {
    const walletInfos = await schema.find({userId, address});
    return walletInfos;
}


module.exports = {exists, save, getWalletInfos};