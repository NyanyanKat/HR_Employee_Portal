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

const routes = require('./routes')
app.use(routes)

app.post("/", (res,resp)=>{
    resp.send("OK")
})

// app.get("*", (req, res) => {
//   res
//     .status(404)
//     .send('404 not found')
// });

module.exports=app