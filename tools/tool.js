const jwt = require('jsonwebtoken');

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