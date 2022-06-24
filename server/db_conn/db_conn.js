const mongoose = require("mongoose")
const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI)
.then(()=> console.log("Successfully connect to MongoDB  - HR Group Project"))
.catch((err)=> console.log("Failed to connect to MongoDB", err.message))

module.exports = mongoose.connection
