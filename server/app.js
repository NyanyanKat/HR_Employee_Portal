const express = require('express')
const app = express()
const routes = require('/routes')

require('dotenv').config()

//access-control-allow-origin
const cors = require('cors')
app.use(cors())
app.use(routes)

//resolving req data
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.get("", (res,resp)=>{
    resp.send("ok")
})




module.exports=app