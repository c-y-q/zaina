const configEnvPath = `../config/${process.env.ENV || 'dev'}`;
const express = require('express');
global.fs = require('fs');
global.router = express.Router();
global.config = require(`${configEnvPath}`);
global.log = console.log;
global.cache = require('../conn/redis');
global.mysqlUtil = require('../conn/mysql');
global.mongoose = require('mongoose');
global.mongodbConn = require('../conn/mongodb');
global.mongoModel = require('../mongoModel/model');
global.moment = require('moment');
global.tools = require('../tools/tool');
if (!global.cert) {
    const privateKey = fs.readFileSync(`${process.cwd()}/cert/privkey.pem`).toString();
    const publicKey = fs.readFileSync(`${process.cwd()}/cert/public.pem`).toString();
    global.cert = {
        private: privateKey,
        public: publicKey
    }
}