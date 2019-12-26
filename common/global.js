const configEnvPath = `../config/${process.env.ENV || 'dev'}`;
global.config = require(`${configEnvPath}`);
global.log = console.log;
global.cache = require('../conn/redis');
global.mysqlUtil = require('../conn/mysql');
global.mongoose = require('mongoose');
global.mongodbConn = require('../conn/mongodb');
global.mongoModel = require('../mongoModel/model');