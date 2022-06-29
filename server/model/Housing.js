const { Schema, model } = require("mongoose");
const Report = require("./Report");

const emailValidate = function validateEmail(email) {
    const re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return re.test(String(email).toLowerCase());
};

const housingSchema = new Schema({
    // userID: [{
    //     type: Schema.Types.ObjectId, ref: 'User'
    // }],
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
    landlord: {
        name: {
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
    },
    tenants: [{
        userID: [{
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        }],
        fullname: {
            type: String,
            required: true
        },
        tel: {
            type: Number,
            required: true,
            min: 10
        },
    }],
    // report: [{reportID: {
    //     type: Schema.Types.ObjectId, 
    //     ref: 'Report',
    //     required: true
    // }}]
});

const Housing = model('Housing',housingSchema);

module.exports = Housing;
