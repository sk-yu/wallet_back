'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require("crypto-js");

class users {
    constructor() {
        this._userSchema = new Schema ({
            
            email: String,
            password: String,
            eth: {
                address: String,
                privatekey: String,
            }
        })

        this._user = mongoose.model('users', this._userSchema);
    }

    async signup(email, password, passphase) {
        try {
            if( await this.getInfo(email) ) {
                return retcode.getAlreadyEmailAddress();
            }

            let user = new this._user();
            let ethkey = await eth.generateAddress(passphase);
            
            user.email = email;
            user.password = this.encryptSHA256(password);
            user.eth.address = ethkey.address;
            user.eth.privatekey = this.encryptAES(ethkey.privatekey, passphase);

            await user.save();
            //console.log(user);

            let ret = retcode.getSuccess();
            ret['data'] = {
                address: user.eth.address
            }

            return ret;
        }
        catch(e) {
            console.log(e);
            return e;
        }
    }

    async signin(email, passwd) {
        try{
            let user = await this.getInfo(email);
            //console.log(user);
            if( user == null ) {
                return retcode.getNotfoundEmail();
            }
    
            let encPasswd = this.encryptSHA256(passwd);
            if(encPasswd === user.password) {
                let ret = retcode.getSuccess();
                return ret;
            }
            else {
                return retcode.getWrongPassword();
            }
        }
        catch(e) {
            console.log(e);
            return e;
        }
    }

    async getInfo(email) {
        let user = await this._user.findOne({'email':email}).exec();
        return user;
    }

    async getLast() {
		let users = await this._user.find().sort({$natural : -1}).limit(1);

		if(users && users.length == 1)
			return users[0];

		return undefined;
    }
    
    encryptAES(data, key) {
        return crypto.AES.encrypt(data, key);
    }

    decryptAES(data, key) {
        return crypto.AES.decrypt(data, key).toString(crypto.enc.Utf8);
    }

    encryptSHA256(data) {
        return crypto.SHA256(data).toString(crypto.enc.Hex);
    }
}

module.exports = new users;