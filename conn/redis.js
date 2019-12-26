const Redis = require("ioredis");
const cache =
  process.env.NODE_ENV == "prod"
    ? new Redis.Cluster(config.redis)
    : new Redis(config.redis);
module.exports = cache;
