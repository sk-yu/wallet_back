'use strict'
const express = require('express');
const router = express.Router();
const userSvc = require('../../services/usersService');
const ethSvc = require('../../services/ethService');

//eth 자산정보
router.get('/balance', async (req, res) => {
    try {
        // let userInfo = await userSvc.getWalletInfo(req.headers['x-access-token']);

        // if(userInfo === undefined) {
        //     return res.send(retcode.getWrongParameter());
        // }
            
        // let amount = await ethSvc.getBalance(userInfo.data.address);
        let amount = await ethSvc.getBalance(req.query.address);

        if(amount) {
            let ret = retcode.getSuccess();
            ret['data'] = {
                address:req.query.address,
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
        console.error(error);
        let ret = retcode.getInternalServiceError();
        ret['error'] = error.message;
        return res.send(ret);
    }
});

//eth 전송
router.post('/transfer', async (req, res) => {
    try {
        const userInfo = await userSvc.getUserInfo(req.headers['x-access-token']);
        if(userInfo === undefined) {
            return res.send(retcode.getWrongParameter());
        }
        const txInfo = await ethSvc.sendTransaction(userInfo, req.body.passphase, req.body.from, req.body.to, req.body.amount);

        let ret = retcode.getSuccess();
        ret['data'] = txInfo;

        return res.send(ret);
    }
    catch(error) {
        console.error(error);
        let ret = retcode.getInternalServiceError();
        ret['error'] = error.message;
        return res.send(ret);
    }
});

//주소생성
router.post('/address', async function(req, res) {
    try {
        const userInfo = await userSvc.getUserInfo(req.headers['x-access-token']);
        if(userInfo === undefined) {
            return res.send(retcode.getWrongParameter());
        }
        const address = await userSvc.addAddress(userInfo.email, req.body.passPhase);

        if(address) {
            let ret = retcode.getSuccess();
            ret['data'] = {address};

            return res.json(ret);
        }
    }
    catch(error) {
        console.error(error);
        let ret = retcode.getInternalServiceError();
        ret['error'] = error.message;
        return res.send(ret);
    }
});


module.exports = router;