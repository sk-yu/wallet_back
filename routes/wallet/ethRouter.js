'use strict'
const express = require('express');
const router = express.Router();
const userSvc = require('../../services/usersService');
const ethSvc = require('../../services/ethService');

router.get('/balance', async (req, res) => {
    try {
        let userInfo = await userSvc.getUserInfo(req.headers['access-token']);

        if(userInfo === undefined) {
            return res.send(retcode.getWrongParameter());
        }
            
        let amount = await ethSvc.getBalance(userInfo.eth.address);

        if(amount) {
            let ret = retcode.getSuccess();
            ret['data'] = {
                address:userInfo.eth.address,
                amount:amount
            }

            return res.send(ret);
        }
        else {
            let ret = retcode.getInternalServiceError();
            return res.send(ret);
        }
    }
    catch(error) {
        console.log(error);
        let ret = retcode.getInternalServiceError();
        ret['error'] = error;
        return res.send(ret);
    }
});

router.post('/transfer', async (req, res) => {
    try {
        const userInfo = await userSvc.getUserInfo(req.headers['access-token']);
        const txInfo = await ethSvc.sendTransaction(userInfo, req.body.passphase, req.body.to, req.body.amount);

        let ret = retcode.getSuccess();
        ret['data'] = txInfo;

        return res.send(ret);
    }
    catch(error) {
        console.log(error);
        let ret = retcode.getInternalServiceError();
        ret['error'] = error;
        return res.send(ret);
    }
});


module.exports = router;