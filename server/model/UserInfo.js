const { Schema, model } = require("mongoose");
const User = require('./User')
const bcrypt = require('bcrypt');

const emailValidate = function validateEmail(email) {
    const re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return re.test(String(email).toLowerCase());
};

const userInfoSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    name: {
        first: {
            type: String,
        },
        middle: {
            type: String,
        },
        last: {
            type: String
        },
        preferred: {
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
    license: {
        number: {
            type: String,
        },
        expiration: {
            type: Date,
        },
        photo: {
            type: String,
        },
    },
    address: {
        streetName: {
            type: String,
            required: true
        },
        houseNumber: {
            type: Number,
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
    carInfo: {
        make: {
            type: String
        },
        model: {
            type: String
        },
        color: {
            type: String
        }
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
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    // Profile picture
    profile_pic: {
        type: String,
        default: null
    }
})

const UserInfo = model('UserInfo', userInfoSchema);

// UserInfo.create({
//     userID: '62bb871a6a5422feca047b23',
//     name: { first: 'test4', last: 'test4', preferred: 'test4' },
//     ssn: 1234567890,
//     dob: 01 / 01 / 2022,
//     license: { number: 123456789, expiration: 01 / 01 / 2022, photo: '' },
//     address: { streetName: '123 St', houseNumber: 45, city: 'Piscataway', state: 'NJ', zip: 08901 },
//     tel: 9292572388,
//     carInfo: { make: "Jeep", model: 'Wrangler', color: 'red' },
//     eContact: [
//         { first: 'danling', last: 'sun', tel: 8483133830, email: 'danlingsun@gmail.com', relationship: "friend" },
//         { first: 'dd', last: 'ss', tel: 8483133830, email: 'ds@gmail.com', relationship: "parent" }
//     ],
//     status: 'pending',
//     profile_pic: ""
// }).then(() => {
//     console.log('Successfully create a user info')
// }).catch((e) => {
//     console.log(e)
//     console.log('Failed to create a user info')
// })

module.exports = UserInfo;