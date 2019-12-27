/**
 * 验证手机号
 */
exports.phone = (phone) => {
    const regPhoneNum = /(^1[3456789]\d{9}$)|(^(0\d{2,3}\-)?([2-9]\d{6,7})+(\-\d{1,6})?$)/;
    return regPhoneNum.test(phone);
}