const app = require("./app")
const db = require("./db_conn/db_conn")


const {port} = process.env;

db.once('open',()=>{
    app.listen(port,()=>{
        console.log(`express web server is up: http:127.0.0.1:${port}`)
    })
})