const user = require("./user");
const famlilyClasses = require("./famlilyClasses");
const famlilyUser = require("./famlilyUser");
const famlilyStudents = require("./famlilyStudents");
const famlilyScore = require("./famlilyScore");
const famlilyHomework = require("./famlilyHomework");
const famlilyBulletins = require('./famlilyBulletins');
const famlilyHomeworkAnswer = require("./famlilyHomeworkAnswer");
const [conn, famlily] = require('../conn/mongodb');
const schemasModel = {
  user,
  famlilyClasses,
  famlilyUser,
  famlilyStudents,
  famlilyScore,
  famlilyHomework,
  famlilyBulletins,
  famlilyHomeworkAnswer
};
const Models = {};
for (let name in schemasModel) {
  let model = '';
  if (/^(famlily)/.test(name)) {
    model = famlily.model(name, schemasModel[name]);
  } else {
    model = conn.model(name, schemasModel[name]);
  }
  Models[name] = model;
}
module.exports = Models;