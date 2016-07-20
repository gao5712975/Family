/**
 * Created by Yuan on 2016/7/21.
 */
var redis = require("redis");
var client = redis.createClient({detect_buffers: true});

client.set("foo_rand000000000000", "OK");

client.get("foo_rand000000000000", function (err, reply) {
    console.log(reply.toString());
});

client.quit();