const redis = require('redis');
const keys = require('./keys');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const subscription = redisClient.duplicate();

const fib = index => {
  first = 1;
  second = 1;

  for (i = 2; i < index + 1; i++) {
    temp = first + second
    first = second
    second = temp
  }

  return second
}

subscription.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});

subscription.subscribe('insert');
