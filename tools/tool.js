const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const crypto = require('crypto');
/**
 * 生成登录token
 */
exports.createToken = (obj, key) => {
    return jwt.sign(obj, key, {
        algorithm: 'RS256'
    });
}

exports.verifyToken = (token, key) => {
    try {
        return jwt.verify(token, key, {
            algorithm: 'RS256'
        })
    } catch (error) {
        return false;
    }
}

exports.throwError = (status, msg) => {
    var err = new Error();
    err.status = status;
    err.message = msg;
    return err;
}

exports.uuid = () => {
    return uuid().replace(/\-/g, '');
}

exports.md5 = (str) => {
    const MD5 = crypto.createHash('md5');
    MD5.update(str);
    let res = MD5.digest('hex');
    return res;
}