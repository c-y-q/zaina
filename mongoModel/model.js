const user = require("./user");
const schemas = {
  user
};
const Models = {};
for (let name in schemas) {
  const model = mongodbConn.model(name, schemas[name]);
  Models[name] = model;
}
module.exports = Models;
