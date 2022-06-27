const app = require("./app")
const db = require("./db_conn/db_conn")


const {PORT} = process.env;

db.once('open',()=>{
    app.listen(PORT,()=>{
        console.log(`express web server is up: http:127.0.0.1:${PORT}`)
    })
})