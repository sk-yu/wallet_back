'use strict';
const express = require('express');
const router = express.Router();
const userSvc = require('../services/usersService');

router.get('', async (req, res) => {
    try {
        let history = await userSvc.getTxHistory(req.headers['access-token']);
        let ret = retcode.getSuccess();
        ret['data'] = history;
        return res.send(ret);
    }
    catch(error) {
        console.log(error);
        let ret = retcode.getInternalServiceError();
        ret['error'] = error;
        return res.send(ret);
    }
});

router.post('/logout', (req, res) => {
    return res.send({success: true});
});


module.exports = router;