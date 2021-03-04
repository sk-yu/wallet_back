const userModel = require('../models/usersSchema');
const walletModel = require('../models/ethWalletSchema');
const txHistoryModel = require('../models/txHistorySchema');
const crypto = require('../utils/crypto');
const eth = require('./ethService');
const erc20 = require('./erc20Service');
const jwt = require('../utils/jwt');
const retcode = require('../configs/retcode');

//회원가입
async function signup(email, password, passphase) {
    try {
        if( await userModel.getUserFromEmail(email) ) {
            throw new Error(retcode.getAlreadyEmailAddress().msg);
        }
        let ethkey = await eth.newAddress(passphase);
        console.log(ethkey);
        
        const saveRet = await userModel.save({
            email:email,
            password:crypto.sha256Hash(password),
            keys:[{
                address:ethkey.address,
                privatekey:crypto.enc(ethkey.privateKey, passphase)
            }]
        });

        await walletModel.save({
            userId:saveRet._id.toString(),
            address: ethkey.address,
            token:'',
            symbol: 'ETH',
            decimal:18
        });

        return ethkey.address;
    }
    catch(error) {
        throw error;
    }
}

//로그인
async function signin(email, passwd) {
    try{
        let user = await userModel.getUserFromEmail(email);

        if( user == null ) {
            throw new Error(retcode.getNotfoundEmail().msg);
        }

        let encPasswd = crypto.sha256Hash(passwd);
        if(encPasswd === user.password) {
            // let ret = retcode.getSuccess();
            const token = await jwt.generateToken({email:user.email});
            // ret['token'] = token;
            return token;
        }
        else {
            throw new Error(retcode.getWrongParameter().msg);
        }
    }
    catch(error) {
        throw error;
    }
}

//이더리움 지갑주소 추가
async function addAddress(email, passphase) {
    try {
        let ethkey = await eth.newAddress(passphase);
        // console.log(ethkey);
        // console.log(ethkey.privatekey);

        const key = {
            address:ethkey.address,
            privatekey:crypto.enc(ethkey.privateKey, passphase).toString()
        }
        const retUpdate = await userModel.addAddress(email, key);
        await walletModel.save({
            userId:retUpdate._id.toString(),
            address: ethkey.address,
            token:'',
            symbol: 'ETH',
            decimal:18
        });

        return ethkey.address;
    }
    catch(error) {
        throw error;
    }
}

//erc20 토큰 추가
async function addToken(userInfo, symbol, address, token, decimal) {
    try {
        const res = await walletModel.exists({
            userId:userInfo._id.toString(),
            address,
            token});
        if(res === true) {
            throw new Error(retcode.getTokenAddressExists().msg)
        }
        const ret = await walletModel.save({
            userId:userInfo._id.toString(),
            address,
            token,
            symbol,
            decimal
        });

        return ret;
    }
    catch(error) {
        throw error;
    }
}

//사용자 주소 가져오기
async function getAddressInfos(token) {
    try{
        const jwtdec = await jwt.verifyToken(token);
        if( jwtdec === null ) {
            throw retcode.getTokenError().msg;
        }
        const user = await userModel.getUserFromEmail(jwtdec.email);

        if( user === null ) {
            return retcode.getNotfoundEmail();
        }

        let addresses = new Array;
        user.keys.forEach(key => {
            addresses.push(key.address);
        })

        let ret = retcode.getSuccess();
        ret['data'] = {
            address:addresses
        }

        return ret;
    }
    catch(error) {
        throw error;
    }
}

//사용자 erc20 토큰 및 balance 가져오기
async function getWalletInfos(auth, address) {
    try{
        const jwtdec = await jwt.verifyToken(auth);
        if( jwtdec === null ) {
            throw retcode.getTokenError().msg;
        }
        const user = await userModel.getUserFromEmail(jwtdec.email);
        const tokens = await walletModel.getWalletInfos(user._id.toString(), address);

        if( user === null ) {
            return retcode.getNotfoundEmail();
        }

        if( tokens === null) {
            return retcode.getNotFoundWallet();
        }

        let ret = retcode.getSuccess();
        let arr = new Array;

        const promises = tokens.map( async (token) => {
            let amount = '';
            if(token.symbol === 'ETH') {
                amount = await eth.getBalance(token.address);
            }
            else {
                amount = await erc20.getBalance(token.address, token.token);
            }
            arr.push({
                symbol:token.symbol,
                token:token.token,
                address:token.address,
                decimal:token.decimal,
                amount:amount
            });
            // console.log(amount);
        });
        await Promise.all(promises);

        ret['data'] = arr;
        // ret['data'] = tokens;

        return ret;
    }
    catch(error) {
        throw error;
    }
}

async function getUserInfo(token) {
    try{
        const jwtdec = await jwt.verifyToken(token);
        if( jwtdec === null ) {
            throw retcode.getTokenError().msg;
        }
        const user = await userModel.getUserFromEmail(jwtdec.email);

        return user;
    }
    catch(error) {
        throw error;
    }
}

//히스토리 정보 가져오기
async function getTxHistory(token) {
    try{
        let user = await getUserInfo(token);
        let ret = await txHistoryModel.findAll(user._id);
        return ret;
    }
    catch(error) {
        throw error;
    }
}

module.exports = {signup, signin, addAddress, addToken, getAddressInfos, getWalletInfos, getUserInfo, getTxHistory};