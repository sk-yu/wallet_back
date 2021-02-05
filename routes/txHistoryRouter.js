'use strict';
const express = require('express');
const router = express.Router();
const userSvc = require('../services/usersService');

router.get('', async (req, res) => {
    try {
        let history = await userSvc.getTxHistory(req.headers['x-access-token']);
        let ret = retcode.getSuccess();
        ret['data'] = history;
        return res.send(ret);
    }
    catch(error) {
        console.error(error);
        let ret = retcode.getInternalServiceError();
        ret['error'] = error;
        return res.send(ret);
    }
});

module.exports = router;