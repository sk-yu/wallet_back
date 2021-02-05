'use strict';
const express = require('express');
const router = express.Router();
const userSvc = require('../services/usersService');

//회원가입
router.post('/signup', async (req, res) => {
    try {
        let ret = retcode.getSuccess();
        const address = await userSvc.signup(req.body.email, req.body.password, req.body.passphase);
        ret['data'] = {address};
        return res.status(ret.status).send(ret);
    }
    catch(error) {
        console.error(error);
        let ret = retcode.getInternalServiceError();
        ret['error'] = error.message;
        return res.status(ret.status).send(ret);
    }
});

//로그인
router.post('/signin', async (req, res) => {
    try {
        const token = await userSvc.signin(req.body.email, req.body.password);
        let ret = retcode.getSuccess();
        ret['token']=token;
        console.log(ret);
        return res.status(ret.status).send(ret);
    }
    catch(error) {
        console.error(error);
        let ret = retcode.getInternalServiceError();
        ret['error'] = error.message;
        return res.status(ret.status).send(ret);
    }
});

//지갑정보 (address 정보)
router.get('/address', async (req, res) => {
    try {
        const ret = await userSvc.getAddressInfos( req.headers['x-access-token']);
        return res.send(ret);
    }
    catch(error){
        console.error(error);
        let ret = retcode.getInternalServiceError();
        ret['error'] = error;
        return res.status(ret.status).send(ret); 
    }
});

//지갑정보 (토큰포함)
router.get('/wallets', async (req, res) => {
    try {
        const ret = await userSvc.getWalletInfos( req.headers['x-access-token'], req.query.address);
        return res.send(ret);
    }
    catch(error){
        console.error(error);
        let ret = retcode.getInternalServiceError();
        ret['error'] = error;
        return res.status(ret.status).send(ret); 
    }
});

router.post('/signout', (req, res) => {
    return res.json({success: true});
});


module.exports = router;