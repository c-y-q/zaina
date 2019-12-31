const conn = mongoose.createConnection(config.mongodb.url, config.mongodb.opt);
conn.on('open', function () {
    console.log("mongodb open: ", config.mongodb.url);
})
conn.on('error', function (err) {
    console.log("mongodb error: ", err);
})

/**
 * 家校惠通mongodb
 */
const famlily = mongoose.createConnection(config.mongodb.famlily.url, config.mongodb.famlily.opt);
famlily.on('open', function () {
    console.log("famlily open: ", config.mongodb.famlily.url);
})
famlily.on('error', function (err) {
    console.log("famlily error: ", err);
})
module.exports = [conn, famlily];