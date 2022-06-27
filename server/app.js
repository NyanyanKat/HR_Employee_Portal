const express = require('express')
const app = express()

require('dotenv').config()
// require('./model/User')

//access-control-allow-origin
const cors = require('cors')
app.use(cors())

//resolving req data
app.use(express.urlencoded({extended:false}))
app.use(express.json())

const routes = require('./routes/index.js')
app.use(routes)

app.get("", (res,resp)=>{
    resp.send("ok")
})

module.exports=app