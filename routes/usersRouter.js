'use strict';
const express = require('express');
const router = express.Router();
const userSvc = require('../services/usersService');

router.post('/signup', async (req, res) => {
    try {
        let ret = await userSvc.signup(req.body.email, req.body.password, req.body.passphase);
        return res.send(ret);
    }
    catch(error) {
        console.log(error);
        let ret = retcode.getInternalServiceError();
        ret['error'] = error;
        return res.send(ret);
    }
});

router.post('/signin', async (req, res) => {
    try {
        let ret = await userSvc.signin(req.body.email, req.body.password);
        res.set('access-token', ret.token);
        delete ret['token'];
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