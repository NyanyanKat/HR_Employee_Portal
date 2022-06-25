const db = require("../db_conn/db_conn");
const app = require("../app");
const User = require("../models/User");
const userSeeds = require("./userSeeds.json");

db.once("open", () => {
    console.log("db connected");
    User.create(userSeeds, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    }).then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`express web server is up: http:3001`);
        })
    })
});