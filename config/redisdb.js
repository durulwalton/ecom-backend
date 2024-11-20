const redis = require('redis');
// Create a Redis client
const client = redis.createClient({
  url: "redis://localhost:6379", // default port is 6379
});
client
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch(console.error);
client.on("error", (err) => {
  console.error("Redis connection error:", err);
});

async function setKey(key, value) {
  try {
    await client.set(key, value);
    console.log(`Set key: ${key}, value: ${value}`);
  } catch (err) {
    console.error(err);
  }
}

async function getKey(key) {
  try {
    const value = await client.get(key);
    console.log(`Got value for key ${key}: ${value}`);
    return value;
  } catch (err) {
    console.error(err);
  }
}
