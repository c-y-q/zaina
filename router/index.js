const user = require('./user');
const petInfo = require('./petInfo');
const eleccar = require('./eleccar');
const famliy = require('./famliy');
module.exports = (app) => {
    app.use('/user', user);
    app.use('/pet', petInfo);
    app.use('/eleccar', eleccar);
    app.use('/famliy', famliy);
}