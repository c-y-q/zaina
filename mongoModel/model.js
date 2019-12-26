const user = require('./user');
const infolist = require('./infolist');
const schemas = {
    user,
    infolist
}
const Models = {};
for (let name in schemas) {
    const model = mongodbConn.model(name, schemas[name]);
    Models[name] = model;
}
module.exports = Models;