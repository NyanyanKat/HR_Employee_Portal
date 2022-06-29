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
        ref: User,
        required: true
    },
    name: {
        first: {
            type: String,
            required: true
        },
        middle: {
            type: String,
        },
        last: {
            type: String,
            required: true
        },
        middle: {
            type: String,
        },
        perferred: {
            type: String,
        }
    },
    profile: {
        data: Buffer,
        contentType: String
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
    cellphone: {
        type: Number,
        required: true,
        min: 10
    },
    workphone: {
        type: Number,
        min: 10
    },
    car: {
        make: {
            type: String,
        },
        model: {
            type: String,
        },
        color: {
            type: String,
        },
    },
    ssn: {
        type: Number,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other', 'I do not wish to answer'],
        default: 'I do not wish to answer'
    },
    citizenship: {
        citizen: {
            type: Boolean,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        optReceipt: {
            data: Buffer,
            contentType: String
        },
        start: {
            type: Date
        },
        end: {
            type: Date
        },
    },
    license: {
        number: {
            type: Number,
        },
        expiration: {
            type: Date,
        },
        photo: {
            data: Buffer,
            contentType: String
        },
    },
    reference: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        },
        middle: {
            type: String,
        },
        tel: {
            type: Number,
            required: true,
            min: 10
        },
        email: {
            type: String,
            required: true,
            trim: true,
            validate: [emailValidate, "invalid email"]
        },
        relationship: {
            type: String,
            required: true
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
        middle: {
            type: String,
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
        default: 'pending',
        required: true
    },
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
