'use strict'

class retcode {
    getSuccess() {
        return {
            code : 200,
            msg : 'Success'
        }
    }

    getWrongParameter() {
        return {
            code: 501,
            msg: 'Wrong Paramenter'
        }
    }

    getAlreadyEmailAddress() {
        return {
            code: 510,
            msg: 'already email address'
        }
    }

    getNotfoundEmail() {
        return {
            code: 511,
            msg: 'NotfoundEmail'
        }
    }
    getWrongPassword() {
        return {
            code: 512,
            msg: 'WrongPassword'
        }
    }
}

module.exports = new retcode;