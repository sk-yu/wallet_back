const express = require('express');
const router = express.Router();
const userSvc = require('../../services/usersService');
const erc20Svc = require('../../services/erc20Service');


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
                address:req.query.address,
                amount:tokenInfo.amount,
                symbol:tokenInfo.symbol
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

//토큰추가
router.post('/add', async function(req, res) {
    try {
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