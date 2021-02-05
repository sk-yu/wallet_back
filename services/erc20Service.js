'use strict'
const web3 = require('web3');
const property = require('../configs/property');
const crypto = require('../utils/crypto');
const abiDecoder = require('abi-decoder');
const abiFile = require('./erc20.abi');
abiDecoder.addABI(abiFile);
const txHistoryModel = require('../models/txHistorySchema');

class erc20 {
    constructor() {
        this._web3 = new web3(new web3.providers.HttpProvider(property.ethRpc));
    }

    async getBalance(address, erc20Address) {
        try{
            const token = new this._web3.eth.Contract(abiFile, erc20Address,{
                form:address
            });

            const result = await token.methods.balanceOf(address).call();
            const decimal = await token.methods.decimals().call();
            const balance = result / Math.pow(10, decimal);
            const symbol = await token.methods.symbol().call();

            // console.log(`balanceOf : ${user.eth.address} ${balance + ' ' + symbol}`);
            // return balance + ' ' + symbol;
            return balance.toString();
        }
        catch(e) {
            console.error(e);
            throw e;
        }
    }

    async sendTransaction(user, passphase, from, to, amount, tokenaddress) {
        try{
            const encKey = user.keys.find(key => key.address === from);
            if(encKey === undefined) {
                throw new Error('address not found');
            }
            
            const token = new this._web3.eth.Contract(abiFile, tokenaddress,{
                form:user.eth.address
            });

            const privateKey = crypto.dec(user.eth.privatekey, passphase);
            const txValue = '0x0';
            const nonce = await this._web3.eth.getTransactionCount(user.eth.address);
            const decimal = await token.methods.decimals().call();
            const balance = amount*Math.pow(10, decimal);
            const txData = token.methods.transfer(to, balance.toString()).encodeABI();
            const symbol = await token.methods.symbol().call();

            let rawTx = await this._web3.eth.accounts.signTransaction({    
                from: user.eth.address,
                to: tokenaddress,
                value: txValue,
                gasPrice: '0x4e3b29200',
                gas: '0x186a0',
                nonce:nonce,
                data: txData
            },
            privateKey);

            // console.log(rawTx);

            let txInfo = await this._web3.eth.sendSignedTransaction(rawTx.rawTransaction);
            console.log(txInfo);

            if(txInfo !== null || txInfo.status !== true) {
                await txHistoryModel.save({
                    userKey: user._id,
                    fromAddr: to,
                    toAddr: to,
                    blockHash: txInfo.blockHash,
                    blockNum: txInfo.blockNumber,
                    txHash: txInfo.transactionHash,
                    txNum: txInfo.transactionIndex,
                    amount: amount.toString(),
                    symbol: symbol
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
            console.log(e);
            throw e;
        }
    }
}

module.exports = new erc20;