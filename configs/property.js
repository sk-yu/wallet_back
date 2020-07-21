'use strict';

module.exports = {
    apiPrePath: '/api/v1',
    mongoUrl: 'mongodb://username:password@localhost/wallet',
    ethRpc: 'https://ropsten-rpc.linkpool.io',
    erc20: '',
    jwt:{
        secret: 'test',
        options:{
            expiresIn: '30m',
            algorithm: 'HS256'
        }
    }
 
}