module.exports = {
    pet: {
        imgHttp: "http://192.168.50.111:7001",
        replaceImgPath: "/home/manage_sys/app"
    },
    port: 7003,
    noToken: ["/user/login", "/user/sendSMS"],
    mysql: {
        node1: {
            host: "192.168.50.111",
            port: 3306,
            user: "root",
            password: "123456",
            database: "manage-sys-pro-emp",
            charset: "utf8",
            waitForConnections: true,
            connectionLimit: 10, //单次可创建最大连接数
            queueLimit: 0 //连接池的最大请求数，从getConnection方法前依次排队。设置为0将没有限制
        },
        node2: {
            host: "192.168.50.111",
            port: 3306,
            user: "root",
            password: "123456",
            database: "manage-sys-pro-emp",
            charset: "utf8",
            waitForConnections: true,
            connectionLimit: 10, //单次可创建最大连接数
            queueLimit: 0 //连接池的最大请求数，从getConnection方法前依次排队。设置为0将没有限制
        },
        node3: {
            host: "192.168.50.111",
            port: 3306,
            user: "root",
            password: "123456",
            database: "manage-sys-pro-emp",
            charset: "utf8",
            waitForConnections: true,
            connectionLimit: 10, //单次可创建最大连接数
            queueLimit: 0 //连接池的最大请求数，从getConnection方法前依次排队。设置为0将没有限制
        }
    },
    mongodb: {
        url: "mongodb://192.168.50.111:27017/hbzaina",
        opt: {
            useUnifiedTopology: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            autoIndex: false,
            // reconnectTries: Number.MAX_VALUE,
            // autoReconnect: true,
            poolSize: 10,
            bufferMaxEntries: 0
        },
        famlily: {
            url: "mongodb://192.168.50.111:27017/home2school",
            opt: {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                autoIndex: false,
                // reconnectTries: Number.MAX_VALUE,
                // autoReconnect: true,
                poolSize: 10,
                bufferMaxEntries: 0
            }
        }
    },
    redis: {
        port: 6300, // Redis port
        host: "192.168.50.111", // Redis host
        password: "123"
    },
    mssql: {
        user: "sa",
        password: "123456",
        server: "192.168.50.111",
        database: "RFID",
        port: 1433,
        pool: {
            min: 0,
            max: 100,
            idleTimeoutMillis: 3000
        }
    }
};