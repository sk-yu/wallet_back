'use strict';

const express = require('express');
const router = express.Router();

router.post('/signup', async function(req, res) {
    let usernameRegex = /^[a-z0-9]+$/;

    if( !usernameRegex.test(req.body.username)) {
        return res.status(400).json ({
            error: "BAD USERNAME",
            code:1
        });
    }

    try {
        let ret = await users.signup(req.body.email, req.body.password, req.body.passphase);
        return res.json(ret);
    }
    catch(e) {
        console.log(e);
        return e;
    }
});

router.post('/signin', async function(req, res) {
    try {
        let ret = await users.signin(req.body.email, req.body.password);
        return res.json(ret);
    }
    catch(e) {
        console.log(e);
        return e;
    }
});

router.get('/getinfo', (req, res) => {
    return res.json({success: true});
});

router.post('/logout', (req, res) => {
    return res.json({success: true});
});


module.exports = router;