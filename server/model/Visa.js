const { Schema, model, default: mongoose } = require("mongoose");

const visaSchema = new Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    userInfoID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserInfo"
    },
    status: Number, //[1: optreceipt 2: eda 3:i983 4:i20]
    EAD: {
        status: {
            type: String,
            enum: ['never submitted', 'pending', 'approved', 'rejected'],
            default: 'never submitted'
        },
        file: {
            fileName:{
                type:String
            },
            fileType:{
                type:String
            },
            dataURI: {
                data: Buffer,
                contentType: String
            }
        },
        rejFeedback: String
    },
    I983: {
        status: {
            type: String,
            enum: ['never submitted', 'pending', 'approved', 'rejected'],
            default: 'never submitted'
        },
        file: {
            fileName:{
                type:String
            },
            fileType:{
                type:String
            },
            dataURI: {
                data: Buffer,
                contentType: String
            }
        },
        rejFeedback: String
    },
    I20: {
        status: {
            type: String,
            enum: ['never submitted', 'pending', 'approved', 'rejected'],
            default: 'never submitted'
        },
        file: {
            fileName:{
                type:String
            },
            fileType:{
                type:String
            },
            dataURI: {
                data: Buffer,
                contentType: String
            }
        },
        rejFeedback: String
    }
});

const Visa = model("Visa", visaSchema);


// Visa.create({
//     userID: "62c146113e9e35f52e9caa03",
// }).then(()=>{
//     console.log('Successfully create a visa')
// }).catch(()=>{
//     console.log('Failed to create a visa')
// })


module.exports = Visa;