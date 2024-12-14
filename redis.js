const redis = require('redis');
const async = require('async');
const redisConfig = require('./config').redisConfig;



const { uri, port, password } = redisConfig;

console.log(redisConfig)

const client = redis.createClient({
  port,
  host: uri,
  // password,
});

client.on('error', (err) => {
  console.log(`Redis Error ${err}`);
  client.quit();
});

client.on('connect', function (error) {
  // if (!error) {
  //   console.log('Redis connected successfully!');
  // } else {
  //   console.log({ error });
  // }
});

redis.RedisClient.prototype.delWildcard = function (key, callback) {
  client.keys(key, (err, rows) => {
    console.log('rows', rows, err);
    async.each(
      rows,
      (row, callbackDelete) => {
        client.del(row, callbackDelete);
      },
      client.quit(),
      callback
    );
  });
};
module.exports = client;
