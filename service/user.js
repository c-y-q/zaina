exports.findUser = async (account) => {
    return await mongoModel.user.findOneAndUpdate({
        userName: account
    }, {
        $set: {
            userName: account
        }
    }, {
        upsert: true
    })
}
/**
 * 根据在哪app登录使用的手机号，找到，在哪zaina_user表中的_id;
 */
exports.pushCarIdNum = async (idNum, userId) => {
    const result = await mongoModel.user.findOneAndUpdate({
        userName: account
    }, {
        $addToSet: {
            car: {
                idNum: idNum,
                userId: userId
            }
        }
    });
    return result && result._id || '';
}
exports.findUserByAccount = async (account) => {
    const result = await mongoModel.user.findOne({
        userName: account
    }, {
        _id: 1,
        car: 1,
        family: 1
    })
    return result || '';
}