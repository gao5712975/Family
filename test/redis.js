/**
 * Created by Yuan on 2016/7/21.
 */
var redis = require("redis");
var client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

client.get("foo_rand000000000000", function (err, reply) {
    console.log(reply);
});

client.quit();