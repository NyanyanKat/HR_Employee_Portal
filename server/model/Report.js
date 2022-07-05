const { Schema, model } = require("mongoose");

const reportSchema = new Schema({
    creatorID: {
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
    desc: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    status: {
        type: String,
        enum: ['Open', 'Closed','In Progress'],
        default: 'Open'
    },

});

const Report = model("Report", reportSchema);
module.exports = Report;