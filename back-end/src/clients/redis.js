const redis = require("redis");

let client = null;
(async () => {
    client = redis.createClient();
  
    client.on("error", (error) => {
      console.log(error);
    });
    client.on("connect", () => {
      console.log("Redis bağlantısı kuruldu!");
    });
  
    await client.connect();
})();
module.exports = {
    client
}