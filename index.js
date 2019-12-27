const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
require("./common/global");
const routers = require('./router/index');
require('./middlewares/catchError');
app.use(logger("dev"));
app.use(express.json()).use(
    express.urlencoded({
        extended: false
    })
);
app.use(cookieParser());
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
    console.log(38, req.body)
    next();
})

/**
 * 校验token
 */
app.use(function (req, res, next) {
    if (config.noToken.includes(req.path)) {
        const token = req.headers.token || req.body.token || '';
        const tokenObj = tools.verifyToken(token, cert.public);
        const userName = tokenObj && tokenObj.userName || '';
        if (tokenObj && tokenObj.uuid == caches.get(userName)) {
            next()
        } else {
            throw {
                status: 403,
                router: req.url,
                respMsg: 'token is wrong!',
            }
            return;
        }
    } else {
        next();
    }
})
routers(app);
app.use(function (res, req, next) {
    if (res.path.indexOf('/favicon.ico') != -1) next();
    var err = new Error();
    err.status = 404;
    err.message = `Not Found !`;
    next(err);
});
app.use(function (err, req, res, next) {
    res.json({
        status: err.status || 500,
        router: req.url,
        respMsg: err.respMsg,
        error: err.stack
    });
    console.error(err.stack);
});
const server = http.createServer(app);
server.listen(process.env.PORT || config.port);
server.on("error", function (error) {
    throw new Error(error);
});

server.on("listening", function () {
    const addr = server.address();
    console.log(`app listen on port ${addr.port}.......+++++ 当前运行的环境是：${process.env.NODE_ENV}`);
});