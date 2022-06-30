const express = require('express')
const app = express()

//Insert a initial db data for testing
// require('./model/UserInfo')

require('dotenv').config()


//access-control-allow-origin
const cors = require('cors')
app.use(cors())

//resolving req data
app.use(express.urlencoded({extended:false}))
app.use(express.json())

<<<<<<< HEAD
const routes = require('./routes');
=======
//static file
const path = require("path")
app.use(express.static(path.join(__dirname, "public", "uploads")));

const routes = require('./routes')
>>>>>>> 508373231b4e822bb69a7a4c6a4d0d462202d0ed
app.use(routes)


app.get("/", (res,resp)=>{
    resp.send("OK")
})

// app.get("*", (req, res) => {
//   res
//     .status(404)
//     .send('404 not found')
// });

module.exports = app