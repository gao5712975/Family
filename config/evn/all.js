/**
 * Created by moka on 16-7-18.
 */
"use strict";

module.exports = {
    db:"mongodb://127.0.0.2/moka",
    port: 3000,
    bodyParser: {
        json: {limit: '150kb'},
        urlencoded: {limit: '150kb', extended: true}
    }
};
