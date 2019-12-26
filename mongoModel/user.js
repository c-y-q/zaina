    const Schema = mongoose.Schema;
    module.exports = new mongoose.Schema({
        username: {
            type: String
        },
        password: {
            type: String
        },
    }, {

        collection: 'users'
    });