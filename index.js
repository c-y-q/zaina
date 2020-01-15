require("./common/global");
require('./middlewares/catchError');
const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const routers = require('./router/index');
app.use(logger("dev"));
app.all("*", function (req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Credentials", true);
    res.set("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT ,OPTIONS");
    // if (req.method.toLowerCase() == "options") res.send(200);
    // else 
    next();
});
app.use(express.json()).use(
    express.urlencoded({
        extended: false
    })
);
app.use(cookieParser());
app.use(
    bodyParser.urlencoded({
        limit: "100mb",
        extended: false
    })
).use(
    bodyParser.raw({
        limit: "100mb"
    })
).use(
    bodyParser.text({
        limit: "100mb"
    })
);

/**
 * 将参数接收方式统一改为req.body
 */
app.use(function (req, res, next) {
    req.body = req.method == 'GET' ? req.query : req.method == 'POST' ? req.body : req.param;
    log(38, req.body)
    next();
})

/**
 * 校验token
 */
app.use(async function (req, res, next) {
    if (config.noToken.includes(req.path)) {
        next()
    } else {
        try {
            const token = req.headers.token || req.body.token || req.query.token;
            const tokenObj = tools.verifyToken(token, cert.public);
            log(52, tokenObj)
            const userName = tokenObj && tokenObj.audience || '';
            const redisUserInfo = await cache.get(userName);
            const userStr = redisUserInfo && JSON.parse(redisUserInfo); //tokenObj.visitIP == userStr.visitIP && userStr.visitIP == req.ip && 
            if (!redisUserInfo || !(tokenObj.audience == userStr.audience && tokenObj.uuid == userStr.uuid)) {
                let err = tools.throwError(403, 'token is wrong !');
                next(err);
            } else {
                req.user = userStr;
                next();
            }
        } catch (err) {
            next(err)
        }
    }
})
routers(app);
app.use(function (res, req, next) {
    if (res.path.indexOf('/favicon.ico') != -1) next();
    let err = tools.throwError(404, 'Not Found ');
    next(err);
});
app.use(function (err, req, res, next) {
    let errMsg = {
        status: err.status || 500,
        router: req.path,
        msg: err.message
    }
    process.env.NODE_ENV == 'dev' ? errMsg.error = err.stack : errMsg.error = err.message;
    res.json(errMsg);
    log(83, errMsg);
});
const server = http.createServer(app);
server.listen(process.env.PORT || config.port);
server.on("listening", function () {
    const addr = server.address();
    log(`app listen on port ${addr.port}....... 当前运行的环境是：${process.env.NODE_ENV}`);
});