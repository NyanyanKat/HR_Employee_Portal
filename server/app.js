const express = require('express')
const app = express()

//Insert a initial user for testing
// require('./model/User')

require('dotenv').config()


//access-control-allow-origin
const cors = require('cors')
app.use(cors())

//resolving req data
app.use(express.urlencoded({extended:false}))
app.use(express.json())

const routes = require('./routes/index')
app.use('/api',routes)

app.get("/", (res,resp)=>{
    resp.send("OK")
})

// app.get("*", (req, res) => {
//   res
//     .status(404)
//     .send('404 not found')
// });

module.exports=app