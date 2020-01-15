const sql = require('mssql');
async function getmssqlConnection() {
    const pool = await sql.connect(config.mssql);
    return pool.request();
}
module.exports = getmssqlConnection;