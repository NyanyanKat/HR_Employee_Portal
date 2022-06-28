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
        enum: ['never submitted', 'pending', 'approved', 'rejected'],
        default: 'never submitted',
        required: true
    },
})

const UserInfo = model('UserInfo', userInfoSchema);

module.exports = UserInfo;