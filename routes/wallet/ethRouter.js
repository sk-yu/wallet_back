'use strict'
const express = require('express');
const router = express.Router();
const userSvc = require('../../services/usersService');
const ethSvc = require('../../services/ethService');

/**
 * @swagger
 * tags:
 *   name: eth
 *   description: ethereum 관련 api (자산정보, 전송, 주소생성)
 */
/**
 * @swagger
 * path:
 *   /api/v1/eth/balance:
 *     get:
 *       summary: eth 자산정보
 *       security: 
 *         - accessToken: []
 *       tags:
 *         - eth
 *       parameters:
 *         - in: query
 *           name: address
 *           schema:
 *             type: string
 *           required: true
 *           description: user address
 *       responses:
 *         200:
 *           description: 성공
 *         4xx~5xx:
 *           description: 실패
 */
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

/**
 * @swagger
 * path:
 *   /api/v1/eth/transfer:
 *     post:
 *       summary: eth 전송
 *       security: 
 *         - accessToken: []
 *       tags:
 *         - eth
 *       parameters: []
 *       requestBody:
 *         description: from, to, amount, passphase
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  from:
 *                    type: string
 *                    example: 0x00...
 *                  to:
 *                    type: string
 *                    example: 0x00...
 *                  amount:
 *                    type: string
 *                    example: 0.001
 *                  passphase:
 *                    type: string
 *                    example: 1234
 *       responses:
 *         '200':
 *           description: 성공
 *         '4xx-5xx':
 *           description: 실패
 */
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

/**
 * @swagger
 * path:
 *   /api/v1/eth/address:
 *     post:
 *       summary: 지갑 주소생성
 *       security: 
 *         - accessToken: []
 *       tags:
 *         - eth
 *       parameters: []
 *       requestBody:
 *         description: passphase
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  passphase:
 *                    type: string
 *                    example: 1234
 *       responses:
 *         '200':
 *           description: 성공
 *         '4xx-5xx':
 *           description: 실패
 */
//주소생성
router.post('/address', async function(req, res) {
    try {
        const userInfo = await userSvc.getUserInfo(req.headers['x-access-token']);
        if(userInfo === undefined) {
            return res.send(retcode.getWrongParameter());
        }
        const address = await userSvc.addAddress(userInfo.email, req.body.passphase);

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