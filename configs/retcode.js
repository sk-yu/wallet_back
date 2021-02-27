'use strict'

class retcode {
    getSuccess() {
        return {
            status : 200,
            msg : 'Success',
            result: true
        }
    }

    getInternalServiceError() {
        return {
            status: 500,
            msg: 'Internal Service Error',
            result: false
        }  
    }

    getWrongParameter() {
        return {
            status: 500,
            msg: 'Wrong Paramenter',
            result: false
        }
    }

    getAlreadyEmailAddress() {
        return {
            status: 401,
            msg: 'email address already exists',
            result: false
        }
    }

    getNotfoundEmail() {
        return {
            status: 401,
            msg: 'NotfoundEmail',
            result: false
        }
    }
    getWrongPassword() {
        return {
            status: 401,
            msg: 'WrongPassword',
            result: false
        }
    }
    getTokenError() {
        return {
            status: 401,
            msg: 'Token Error',
            result: false
        }
    }
    getNotFoundWallet() {
        return {
            status: 500,
            msg: 'Wallet not fount',
            result: false
        }
    }
    getTokenAddressExists() {
        return {
            status: 500,
            msg: 'token address already exists',
            result: false   
        }
    }
}

module.exports = new retcode;