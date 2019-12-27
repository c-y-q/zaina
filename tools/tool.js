const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const crypto = require('crypto');
const axios = require('axios');
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
    const res = MD5.digest('hex');
    return res;
}

/**
 * 发送短信
 */
exports.sendSMS = async (phone) => {
    const vcode = ('' + Math.random()).match(/\d{6}/)[0];
    const url = `https://feginesms.market.alicloudapi.com/codeNotice?param=${vcode}&phone=${phone}&sign=500064&skin=900115`;
    const data = await axios.get(url, {
        headers: {
            Authorization: "APPCODE 2f9ea1ef7eb445368398c0c767521a87"
        }
    })
    return [data, vcode];
};

exports.toTuoFeng = obj => {
    if (!obj || Object.keys(obj).length == 0) {
        return [];
    }
    let str = JSON.stringify(obj);
    let resutKey = str.replace(/\_[a-z]/g, val => val.toUpperCase().replace(/\_/g, ""))
    return JSON.parse(resutKey);
};