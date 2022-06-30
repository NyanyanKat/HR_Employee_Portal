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
        ref: 'User',
    },
    name: {
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
        perferred: {
            type: String,
        }
    },
    profile: {
        type:String,
        default:null
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
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'I do not wish to answer'],
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
            type:String,
            default:null
        },
        start: {
            type: String
        },
        end: {
            type: String
        },
    },
    license: {
        number: {
            type: String,
        },
        expiration: {
            type: String
        },
        photo: {
            type:String,
            default:null
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
//     userID: '62bbff16e1c72482017c0a0a',
//     name: { first: 'AA', last: 'BB', preferred: 'CC' },
//     ssn: 1234567890,
//     dob: 01-01-2000,
//     license: { number: "Lis1234567890", expiration: 09-01-2022, photo: '' },
//     address: { streetName: '123 St', houseNumber: 45, city: 'Piscataway', state: 'NJ', zip: 08901 },
//     cellphone: 9292572388,
//     carInfo: { make: "Jeep", model: 'Wrangler', color: 'red' },
//     eContact: [
//         { first: 'danling', last: 'sun', tel: 8483133830, email: 'danlingsun@gmail.com', relationship: "friend" },
//         { first: 'dd', last: 'ss', tel: 8483133830, email: 'ds@gmail.com', relationship: "parent" }
//     ],
//     reference: {first:'lala',last: 'la', tel: 1234567890, email: 'email@gmail.com', relationship: 'friend'},
//     citizenship:{citizen:false, status:'Green Card'},
//     status: 'pending',
//     profile_pic: ""
// }).then(() => {
//     console.log('Successfully create a user info')
// }).catch((e) => {
//     console.log(e)
//     console.log('Failed to create a user info')
// })

module.exports = UserInfo;

