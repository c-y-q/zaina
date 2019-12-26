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
app.use(express.json());
app.use(
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
);
app.use(
    bodyParser.raw({
        limit: "100mb"
    })
);
app.use(
    bodyParser.text({
        limit: "100mb"
    })
);

routers(app);

app.use(function (res, req, next) {
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
server.listen(config.port);
server.on("error", function (error) {
    throw new Error(error);
});

server.on("listening", function () {
    const addr = server.address();
    console.log(`app listen on port ${addr.port}.......+++++ 当前运行的环境是：${process.env.NODE_ENV}`);
});