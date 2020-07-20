'use strict'

class retcode {
    getSuccess() {
        return {
            code : 200,
            msg : 'Success'
        }
    }

    getInternalServiceError() {
        return {
            code: 500,
            msg: 'Internal Service Error'
        }  
    }

    getWrongParameter() {
        return {
            code: 500,
            msg: 'Wrong Paramenter'
        }
    }

    getAlreadyEmailAddress() {
        return {
            code: 500,
            msg: 'already email address'
        }
    }

    getNotfoundEmail() {
        return {
            code: 500,
            msg: 'NotfoundEmail'
        }
    }
    getWrongPassword() {
        return {
            code: 500,
            msg: 'WrongPassword'
        }
    }
    getTokenError() {
        return {
            code: 500,
            msg: 'Token Error'
        }
    }
}

module.exports = new retcode;