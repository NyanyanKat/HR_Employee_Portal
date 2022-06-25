const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

const emailValidate = function validateEmail(email) {
    const re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return re.test(String(email).toLowerCase());
};


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: [emailValidate, "invalid email"]
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    role: {
        type: String,
        enum: ['hr','empoyee'],
        default: 'employee'
    },
});

//middleware to encrypt password
userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

const User = model("User", userSchema);


// User.create({
//     username:'admin',
//     email:'admin@gmail.com',
//     password:'admin',
//     role:'hr',
// }).then(()=>{
//     console.log('Successfully create a user')
// }).catch(()=>{
//     console.log('Failed to create a user')
// })


module.exports = User;