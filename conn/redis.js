const Redis = require("ioredis");
const cache = process.env.NODE_ENV == "prod" ? new Redis.Cluster(config.redis) : new Redis(config.redis);
cache.on('ready', function () {
  log('redis is connect ok......');
})
cache.on('error', function (err) {
  log(`redis is error: ${err}`);
})
module.exports = cache;