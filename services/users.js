

async function signup(email, password, passphase) {
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

async function signin(email, passwd) {
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