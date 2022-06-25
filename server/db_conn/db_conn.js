const mongoose = require("mongoose")
// const { MONGO_URI } = process.env;

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hr'),
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
// .then(()=> console.log("Successfully connect to MongoDB  - HR Group Project"))
// .catch((err)=> console.log("Failed to connect to MongoDB", err.message))

module.exports = mongoose.connection
