'use strict'
const web3 = require('web3');
// const keythereum = require('keythereum');
const ethereumUtil = require('ethereumjs-util');

class eth {
    constructor() {
        this._web3 = new web3(new web3.providers.HttpProvider(property.ethRpc));
    }

    async getBalance(addr) {
        try{
            let amount = await this._web3.eth.getBalance(addr);
            return this._web3.utils.fromWei(amount);
        }
        catch(e) {
            throw e;
        }

        return undefined;
    }

    async newAddress(passPhase) {
        try {
            let addr = await this._web3.eth.accounts.create(passPhase);
            //console.log(addr);
            return addr;
        }
        catch(e) {
            throw e;
        }
        return undefined;
    }

    async generateAddress(passPhase) {
        // let ret = {};

        // // piravte key
        // let params = { keyBytes: 32, ivBytes: 16 };       
        // let pk = keythereum.create(params);
        
        // if(ethereumUtil.isValidPrivate(pk.privateKey)) {
        //     ret['privatekey'] = ethereumUtil.bufferToHex(pk.privateKey);
        //     //console.log(`privatekey: ` + ret.pravatekey);
        // }
        // else {
        //     return undefined;
        // }

        // // public key
        // let publicKey = ethereumUtil.privateToPublic(pk.privateKey);
        // if(ethereumUtil.isValidPublic(publicKey)) {
        //     ret['publickey'] = ethereumUtil.bufferToHex(publicKey);
        //     //console.log(`publickey: ` + ret.publickey);
        // }
        // else {
        //     return undefined;
        // }

        // // address
        // let address = ethereumUtil.pubToAddress(publicKey);
        // let hexAddress = ethereumUtil.bufferToHex(address);
        // if(ethereumUtil.isValidAddress(hexAddress)) {
        //     ret['address'] = hexAddress;
        //     //console.log(`address: ` + ret.address);
        // }
        // else {
        //     return undefined;
        // }

        // return ret;
    }

    async sendTransfer(passPhase, to, amount) {
        let ret = {};
        ret['txHash'] = txHash;
        try {
            return txHash;
        }
        catch(e) {
            throw e;
        }
    }
}

module.exports = new eth;