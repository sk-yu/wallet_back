const express = require('express');
const router = express.Router();

router.post('/getBalance', (req, res) => {
    return res.json({success: true});
});

router.post('/sendTransaction', (req, res) => {
    return res.json({success: true});
});

module.exports = router;