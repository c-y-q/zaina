const mysql = require("mysql2");
class MysqlModel {
    constructor() {
        this.mysqlConfig = config.mysql;
    }

    /**
     * 实例化mysql
     */
    mysqlInstance() {
        const poolCluster = mysql.createPoolCluster({
            removeNodeErrorCount: 1, // Remove the node immediately when connection fails.
            defaultSelector: "RR" //RR,RANDOM,ORDER
        });
        const mysqlNodes = this.mysqlConfig;
        for (let node in (mysqlNodes)) {
            poolCluster.add(`"${node}"`, mysqlNodes[`${node}`]);
        }
        return new Promise((resolve, reject) => {
            poolCluster.getConnection(function (err, connection) {
                if (err) {
                    reject(err);
                } else {
                    resolve([
                        connection,
                        poolCluster
                    ]);
                }
            })
        })
    }

    /**
     * 获取mysql数据库连接
     */
    async getConnection() {
        return await this.mysqlInstance();
    }
}

async function mysqlDBUtil() {
    try {
        const db = new MysqlModel();
        const [conn, pool] = await db.getConnection();
        log(46, 'mysql连接成功')
        /**
         * 回滚事务
         */
        const rollback = async function () {
            conn.rollback();
            log('mysql事务发生回滚......rollback')
        }

        /**
         * 数据库操作
         * @param {} sql 
         * @param {*} options 
         */
        const query = function (sql, options) {
            return new Promise((resolve, reject) => {
                conn.query(sql, options, function (error, results, fields) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                })
            })
        }

        /**
         *提交事务
         */
        const commit = function () {
            return new Promise((resolve, reject) => {
                conn.commit(function (err) {
                    if (err) {
                        reject(err);
                    }
                    log('mysql事务提交......commit')
                });
            })
        }
        /**
         * 关闭连接池，mysql2的包自己不会释放
         */
        const close = async function () {
            pool.end();
            log('mysql连接池关闭.....close');
        }
        return {
            rollback,
            commit,
            close,
            query
        }
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = mysqlDBUtil;