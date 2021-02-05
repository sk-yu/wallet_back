'use strict'
const web3 = require('web3');
const property = require('../configs/property');
const crypto = require('../utils/crypto');
const txHistoryModel = require('../models/txHistorySchema');

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

    async sendTransaction(user, passphase, from, to, amount) {
        try{
            const encKey = user.keys.find(key => key.address === from);
            if(encKey === undefined) {
                throw new Error(retcode.getAlreadyEmailAddress().msg);
            }
            const privateKey = crypto.dec(encKey.privatekey, passphase);
            const txValue = this._web3.utils.numberToHex(this._web3.utils.toWei(amount.toString(), 'ether'));
            const nonce = await this._web3.eth.getTransactionCount(from);

            const rawTx = await this._web3.eth.accounts.signTransaction({    
                from: from,
                to: to,
                value: txValue,
                gasPrice: '0x4e3b29200',
                gas: '0x186a0',
                nonce:nonce
            },
            privateKey);

            const txInfo = await this._web3.eth.sendSignedTransaction(rawTx.rawTransaction);
            // console.log(txInfo);

            if(txInfo !== null || txInfo.status !== true) {

                await txHistoryModel.save({
                    userKey: user._id,
                    fromAddr:from,
                    toAddr: to,
                    blockHash: txInfo.blockHash,
                    blockNum: txInfo.blockNumber,
                    txHash: txInfo.transactionHash,
                    txNum: txInfo.transactionIndex,
                    amount: amount.toString(),
                    symbol:'ETH',
                    createDt: new Date()
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
            // console.error(e);
            throw e;
        }
    }
}

module.exports = new eth;