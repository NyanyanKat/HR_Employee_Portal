const mongoose = require("mongoose")
const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI)
.then(()=> console.log("Successfully connect to MongoDB  - HR Project"))
.catch(()=> console.log("Failed to connect to MongoDB"))

module.exports = mongoose.connection
