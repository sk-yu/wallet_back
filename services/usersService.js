const userModel = require('../models/users');
const txHistoryModel = require('../models/txHistory');
const crypto = require('../utils/crypto');
const eth = require('./ethService');
const jwt = require('../utils/jwt');

async function signup(email, password, passphase) {
    try {
        if( await userModel.getUserFromEmail(email) ) {
            return retcode.getAlreadyEmailAddress();
        }
        let ethkey = await eth.newAddress(passphase);
        console.log(ethkey);
        console.log(ethkey.privatekey);
        
        await userModel.save({
            email:email,
            password:crypto.sha256Hash(password),
            eth:{
                address:ethkey.address,
                privatekey:crypto.enc(ethkey.privateKey, passphase)
                // privatekey:ethkey.privateKey
            }
        });

        let ret = retcode.getSuccess();
        ret['data'] = {
            address: ethkey.address
        }

        return ret;
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

async function signin(email, passwd) {
    try{
        let user = await userModel.getUserFromEmail(email);

        if( user == null ) {
            return retcode.getNotfoundEmail();
        }

        let encPasswd = crypto.sha256Hash(passwd);
        if(encPasswd === user.password) {
            let ret = retcode.getSuccess();
            const token = await jwt.generateToken({email:user.email});
            ret['token'] = token;
            return ret;
        }
        else {
            return retcode.getWrongPassword();
        }
    }
    catch(error) {
        throw error;
    }
}

async function getUserInfo(token) {
    try{
        let jwtdec = await jwt.verifyToken(token);
        if( jwtdec === null ) {
            throw retcode.getTokenError().msg;
        }
        let user = await userModel.getUserFromEmail(jwtdec.email);

        if( user === null ) {
            return retcode.getNotfoundEmail();
        }

        return user;
    }
    catch(error) {
        throw error;
    }
}

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

module.exports = {signup, signin, getUserInfo, getTxHistory};