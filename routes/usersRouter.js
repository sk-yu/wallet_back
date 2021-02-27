'use strict';
const express = require('express');
const router = express.Router();
const userSvc = require('../services/usersService');

/**
 * @swagger
 * tags:
 *   name: account
 *   description: 회원가입, 로그인, 지갑정보 가져오기, address정보 가져오기
 */
/**
 * @swagger
 * path:
 *   /api/v1/account/signup:
 *     post:
 *       summary: 회원가입
 *       tags:
 *         - account
 *       requestBody:
 *         description: email, password
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
 *                    example: test@test.com
 *                  password:
 *                    type: string
 *                    example: 1234
 *                  passphase:
 *                    type: string
 *                    example: 1234
 *                    description: 2차 비밀번호
 *       responses:
 *         '200':
 *           description: 성공
 *         '4xx-5xx':
 *           description: 실패
 */
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

/**
 * @swagger
 * path:
 *   /api/v1/account/signin:
 *     post:
 *       summary: 로그인
 *       tags:
 *         - account
 *       requestBody:
 *         description: email, password
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
 *                    example: test@test.com
 *                  password:
 *                    type: string
 *                    example: 1234
 *       responses:
 *         '200':
 *           description: 성공
 *         '4xx-5xx':
 *           description: 실패
 */
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

/**
 * @swagger
 * path:
 *   /api/v1/account/address:
 *     get:
 *       summary: address 정보 가져오기
 *       security:
 *         - accessToken: []
 *       tags:
 *         - account
 *       responses:
 *         '200':
 *           description: 성공
 *         '4xx-5xx':
 *           description: 실패
 */
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

/**
 * @swagger
 * path:
 *   /api/v1/account/wallets:
 *     get:
 *       summary: wallet 정보 가져오기
 *       security: 
 *         - accessToken: []
 *       tags:
 *         - account
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
//지갑정보 (wallets 정보)
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