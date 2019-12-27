const user = require('./user');
const petInfo = require('./petInfo');
module.exports = (app) => {
    app.use('/user', user);
    app.use('/pet', petInfo);
}