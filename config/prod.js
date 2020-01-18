module.exports = {
    pet: {
        imgHttp: "https://api.hbzner.com/dog",
        replaceImgPath: "/home/manage_sys/app"
    },
    port: 7003,
    noToken: ['/user/login', '/user/sendSMS'],
    mysql: {
        node1: {
            host: '172.168.11.65',
            port: 3306,
            user: 'root',
            password: 'petmysql',
            database: 'manage-sys_db',
            charset: 'utf8',
            waitForConnections: true,
            connectionLimit: 10, //单次可创建最大连接数
            queueLimit: 0 //连接池的最大请求数，从getConnection方法前依次排队。设置为0将没有限制
        },
        node2: {
            host: '172.168.11.66',
            port: 3306,
            user: 'root',
            password: 'petmysql',
            database: 'manage-sys_db',
            charset: 'utf8',
            waitForConnections: true,
            connectionLimit: 10, //单次可创建最大连接数
            queueLimit: 0 //连接池的最大请求数，从getConnection方法前依次排队。设置为0将没有限制
        },
        node3: {
            host: '172.168.11.67',
            port: 3306,
            user: 'root',
            password: 'petmysql',
            database: 'manage-sys_db',
            charset: 'utf8',
            waitForConnections: true,
            connectionLimit: 10, //单次可创建最大连接数
            queueLimit: 0 //连接池的最大请求数，从getConnection方法前依次排队。设置为0将没有限制
        }
    },
    mongodb: {
        url: 'mongodb://172.169.1.247:20000,172.169.1.248:20000,172.169.1.249:20000/hbzaina',
        opt: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            autoIndex: false,
            poolSize: 10,
            bufferMaxEntries: 0
        },
        famlily: {
            url: 'mongodb://172.169.1.247:20000,172.169.1.248:20000,172.169.1.249:20000/home2school',
            opt: {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                autoIndex: false,
                poolSize: 10,
                bufferMaxEntries: 0
            }
        }
    },
    redis: [{
            port: 6379,
            host: '172.169.1.249',
            password: '',
            db: 'db0',
        },
        {
            port: 6380,
            host: '172.169.1.249',
            password: '',
            db: 'db0',
        },
        {
            port: 6379,
            host: '172.169.1.248',
            password: '',
            db: 'db0',
        },
        {
            port: 6380,
            host: '172.169.1.248',
            password: '',
            db: 'db0',
        },
        {
            port: 6379,
            host: '172.169.1.247',
            password: '',
            db: 'db0',
        },
        {
            port: 6380,
            host: '172.169.1.247',
            password: '',
            db: 'db0',
        }
    ],
    mssql: {
        user: "sa",
        password: 'T7oWwCaa92FG',
        server: '172.16.2.56',
        database: "RFID",
        port: 1433,
        options: {
            encrypt: true // Use this if you're on Windows Azure
        },
        pool: {
            min: 0,
            max: 100,
            idleTimeoutMillis: 3000
        }
    }

}