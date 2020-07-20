'use strict'
const web3 = require('web3');
const property = require('../configs/property');
const crypto = require('../utils/crypto');
const txHistory = require('../models/txHistory');

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
    }

    async sendTransaction(user, passphase, to, amount) {
        try{
            let privateKey = crypto.dec(user.eth.privatekey, passphase);
            let txValue = this._web3.utils.numberToHex(this._web3.utils.toWei(amount.toString(), 'ether'));
            let nonce = await this._web3.eth.getTransactionCount(user.eth.address);

            let rawTx = await this._web3.eth.accounts.signTransaction({    
                from: user.eth.address,
                to: to,
                value: txValue,
                gasPrice: '0x4e3b29200',
                gas: '0x186a0',
                nonce:nonce
            },
            privateKey);

            let txInfo = await this._web3.eth.sendSignedTransaction(rawTx.rawTransaction);
            // console.log(txInfo);

            if(txInfo !== null || txInfo.status !== true) {

                await txHistory.save({
                    userKey: user._id,
                    toAddr: to,
                    blockHash: txInfo.blockHash,
                    blockNum: txInfo.blockNumber,
                    txHash: txInfo.transactionHash,
                    txNum: txInfo.transactionIndex,
                    amount: amount.toString(),
                    symbol:'ETH'
                });

                return {
                    blockHash: txInfo.blockHash,
                    blockNumber: txInfo.blockNumber,
                    transactionHash: txInfo.transactionHash
                };
            }
            else {
                throw txInfo;
            }
        }
        catch(e) {
            console.error(e);
            throw e;
        }
    }
}

module.exports = new eth;