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
