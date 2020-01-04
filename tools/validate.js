/**
 * 验证手机号
 */
exports.phone = (phone) => {
    const regPhoneNum = /(^1[3456789]\d{9}$)|(^(0\d{2,3}\-)?([2-9]\d{6,7})+(\-\d{1,6})?$)/;
    return regPhoneNum.test(phone);
}

/**
 * 验证身份证号
 */
exports.idCardNum = (idcode) => {
    const weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const check_code = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
    const idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
    const format = idcard_patter.test(idcode);
    const seventeen = idcode.substring(0, 17);
    let num = 0;
    for (let i = 0; i < seventeen.length; i++) {
        num = num + seventeen[i] * weight_factor[i];
    }
    return idcode[17] === check_code[num % 11] && format ? true : false;
}