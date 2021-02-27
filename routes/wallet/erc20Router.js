const express = require('express');
const router = express.Router();
const userSvc = require('../../services/usersService');
const erc20Svc = require('../../services/erc20Service');

/**
 * @swagger
 * tags:
 *   name: token
 *   description: erc20 토큰 관련 api (자산정보, 전송, 토큰추가)
 */
/**
 * @swagger
 * path:
 *   /api/v1/token/balance:
 *     get:
 *       summary: erc20 토큰 자산정보
 *       security: 
 *         - accessToken: []
 *       tags:
 *         - token
 *       parameters:
 *         - in: query
 *           name: address
 *           schema:
 *             type: string
 *           required: true
 *           description: user address
 *         - in: query
 *           name: token
 *           schema:
 *             type: string
 *           required: true
 *           description: token address
 *       responses:
 *         200:
 *           description: 성공
 *         4xx~5xx:
 *           description: 실패
 */
//erc20 토큰 자산정보
router.get('/balance', async (req, res) => {
    try {
        // let userInfo = await userSvc.getUserInfo(req.headers['access-token']);

        // if(userInfo === undefined) {
        //     return res.send(retcode.getWrongParameter());
        // }
            
        let tokenInfo = await erc20Svc.getBalance(req.query.address, req.query.token );

        if(tokenInfo) {
            let ret = retcode.getSuccess();
            ret['data'] = {
                balance:tokenInfo
                // address:req.query.address,
                // amount:tokenInfo.amount,
                // symbol:tokenInfo.symbol
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
 *   /api/v1/token/transfer:
 *     post:
 *       summary: 로그인
 *       security: 
 *         - accessToken: []
 *       tags:
 *         - token
 *       parameters: []
 *       requestBody:
 *         description: from, to, tokenaddress, amount, passphase
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
 *                  tokenaddress:
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
//erc20 토큰 전송
router.post('/transfer', async (req, res) => {
    try {
        const userInfo = await userSvc.getUserInfo(req.headers['x-access-token']);
        if(userInfo === undefined) {
            return res.send(retcode.getWrongParameter());
        }
        const txInfo = await erc20Svc.sendTransaction(userInfo, req.body.passphase, req.body.from, req.body.to, req.body.amount, req.body.tokenaddress);

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
 *   /api/v1/token/add:
 *     post:
 *       summary: 토큰추가
 *       security: 
 *         - accessToken: []
 *       tags:
 *         - token
 *       parameters: []
 *       requestBody:
 *         description: symbol, address, token, decimal
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  symbol:
 *                    type: string
 *                    example: 0x00...
 *                  address:
 *                    type: string
 *                    example: 0x00...
 *                  token:
 *                    type: string
 *                    example: 0x00...
 *                  decimal:
 *                    type: string
 *                    example: number
 *       responses:
 *         '200':
 *           description: 성공
 *         '4xx-5xx':
 *           description: 실패
 */
//토큰추가
router.post('/add', async function(req, res) {
    try {
        if(req.body.symbol === null || req.body.symbol === undefined){
            return res.status(500).send(retcode.getInternalServiceError());
        }

        const userInfo = await userSvc.getUserInfo(req.headers['x-access-token']);
        if(userInfo === undefined) {
            return res.send(retcode.getWrongParameter());
        }
        const tokenInfos = await userSvc.addToken(userInfo, req.body.symbol, req.body.address, req.body.token, req.body.decimal);

        if(tokenInfos) {
            let ret = retcode.getSuccess();
            ret['data'] = tokenInfos;

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