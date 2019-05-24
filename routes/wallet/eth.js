'use strict'

const express = require('express');
const router = express.Router();

router.post('/newAddress', async function(req, res) {
    let passPhase = req.body.passPhase;

    try {
        let address = await eth.newAddress(passPhase);

        if(address) {
            let ret = retcode.getSuccess();
            ret['data'] = address;

            return res.json(ret);
        }
    }
    catch(e) {
        console.log(e);
        return res.json(e);
    }

    return res.json(retcode.getWrongParameter());
});

router.post('/generateAddress', async function(req, res) {
    let passPhase = req.body.passPhase;

    try {
        let address = await eth.generateAddress(passPhase);

        if(address) {
            let ret = retcode.getSuccess();
            ret['data'] = address;

            return res.json(ret);
        }
    }
    catch(e) {
        console.log(e);
        return res.json(e);
    }

    return res.json(retcode.getWrongParameter());
});

router.get('/getBalance', async function(req, res) {
    let addr = req.query.address;

    if(addr === undefined)
        return res.json(retcode.getWrongParameter());

    try {
        let amount = await eth.getBalance(addr);

        if(amount) {
            let ret = retcode.getSuccess();
            ret['data'] = {
                address:addr,
                amount:amount
            }

            return res.json(ret);
        }
    }
    catch(e) {
        console.log(e);
        return res.json(e);
    }

    return res.json(retcode.getWrongParameter());
});

router.post('/sendTransaction', (req, res) => {
    return res.json({success: true});
});


module.exports = router;