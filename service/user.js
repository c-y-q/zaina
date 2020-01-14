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
 * 根据在哪app登录使用的手机号，找到，push car_idNum ,car_userId;
 */
exports.pushCarIdNum = async (account, idNum, userId) => {
    const result = await mongoModel.user.findOneAndUpdate({
        userName: account
    }, {
        $addToSet: {
            car: {
                idNum: idNum,
                userId: userId
            }
        }
    }, {
        upsert: true
    });
    return result && result._id || '';
}
exports.findUserByAccount = async (account) => {
    const result = await mongoModel.user.findOne({
        userName: account
    }, {
        _id: 1,
        car: 1,
        family: 1,
        pet: 1
    })
    return result || '';
}

/**
 * 根据在哪app登录使用的手机号，登录家校惠通，push famlily phone;
 */
exports.pushFamlilyPhone = async (account, userId) => {
    const result = await mongoModel.user.findOneAndUpdate({
        userName: account
    }, {
        $addToSet: {
            famlily: {
                phone: account,
                userId: userId
            }
        }
    }, {
        upsert: true
    });
    return result && result._id || '';
}