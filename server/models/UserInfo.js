const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

const emailValidate = function validateEmail(email) {
    const re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return re.test(String(email).toLowerCase());
};

const userInfoSchema = new Schema({
    name: {
        first: {
            type: String,
        },
        last: {
            type: String
        }
    },
    ssn: {
        type: Number
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        houseNumber: {
            type: Number,
            required: true
        },
        streetName: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip: {
            type: Number,
            required: true
        }
    },
    tel: {
        type: Number,
        required: true,
        min: 10
    },
    eContact: [{
        first: {
            type: String,
            required: true
        },
        last: {
            type: String, 
            required: true
        },
        tel: {
            type: Number,
            required: true,
            min: 10
        },
        email: {
            type: String,
            required: true,
            validate: [emailValidate, 'invalid email']
        },
        relationship: {
            type: String,
            required: true
        }
    }],
    workAuthTitle: {

    }
})

const UserInfo = model('UserInfo', userInfoSchema);

module.exports = UserInfo;