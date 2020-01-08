const configEnvPath = `../config/${process.env.NODE_ENV|| 'dev'}`;
const express = require('express');
global.axios = require('axios');
global.fs = require('fs');
global.router = express.Router();
global.config = require(`${configEnvPath}`);
global.log = console.log;
global.cache = require('../conn/redis');
global.mysqlUtil = require('../conn/mysql');
global.mongoose = require('mongoose');
global.Schema = mongoose.Schema;
global.mongoModel = require('../mongoModel/model');
global.moment = require('moment');
global.tools = require('../tools/tool');
global.validate = require('../tools/validate');
if (!global.cert) {
    const privateKey = fs.readFileSync(`${process.cwd()}/cert/privkey.pem`).toString();
    const publicKey = fs.readFileSync(`${process.cwd()}/cert/public.pem`).toString();
    global.cert = {
        private: privateKey,
        public: publicKey
    }
}