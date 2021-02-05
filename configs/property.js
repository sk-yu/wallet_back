'use strict';

module.exports = {
    apiPrePath: '/api/v1',
    mongoUrl: 'mongodb://wallet:walletuser@localhost/wallet',
    ethRpc: 'https://ropsten.infura.io/v3/da5925aae47741d48f6523631699c715',
    erc20: '',
    jwt:{
        secret: 'secret key',
        options:{
            expiresIn: '1800m',
            algorithm: 'HS256'
        }
    }
 
}