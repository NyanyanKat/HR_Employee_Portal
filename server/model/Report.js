const { Schema, model } = require("mongoose");

const reportSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    housingID: {
        type: Schema.Types.ObjectId, 
        ref: 'Housing',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Open', 'Closed','In Progress'],
        default: 'Open'
    },
    comments: [{
        desc: {
            type: String,
            required: true
        },
        creatorID: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
        timestamp: {
            type: Date,
            required: true
        },
    }]

});

const Report = model("Report", reportSchema);
module.exports = Report;