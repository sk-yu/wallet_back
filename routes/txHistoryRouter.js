'use strict';
const express = require('express');
const router = express.Router();
const userSvc = require('../services/usersService');

/**
 * @swagger
 * tags:
 *   name: history
 *   description: history 정보 가져오기
 */
/**
 * @swagger
 * path:
 *   /api/v1/history:
 *     get:
 *       summary: history 정보 가져오기
 *       security: 
 *         - accessToken: []
 *       tags:
 *         - history
 *       responses:
 *         200:
 *           description: 성공
 *         4xx~5xx:
 *           description: 실패
 */
//트렌젝션 기록
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