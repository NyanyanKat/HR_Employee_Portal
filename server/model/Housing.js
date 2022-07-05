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
        type: Schema.Types.ObjectId,
        ref: 'User',

        // fullname: {
        //     type: String,
        //     required: true
        // },
        // tel: {
        //     type: Number,
        //     required: true,
        //     min: 10
        // },
    }],
    facilityInfo: {
        numBeds: {
            type: Number,
        },
        numMattress: {
            type: Number,
        },
        numTables: {
            type: Number,
        },
        numChairs: {
            type: Number,
        },
        reports: [{
            type: Schema.Types.ObjectId,
            ref: 'Report',
        }],
    },
});

const Housing = model('Housing', housingSchema);

// Housing.create({
//     address: {
//         houseNumber: 11,
//         streetName: 'Green',
//         city: 'San Jose',
//         state: 'CA',
//         zip: 90000
//     },
//     landlord: {
//         name: 'Alan A',
//         tel: 2132132333,
//         email: 'alan@123.com'
//     },
//     tenents: [{
//         userID: '62bbff16e1c72482017c0a0a',
//         fullname: 'user user',
//         tel: 4084088888
//     }]
// }).then(() => {
//     console.log('Successfully create a housing')
// }).catch((e) => {
//     console.log(e)
//     console.log('Failed to create a housing')
// })

module.exports = Housing;
