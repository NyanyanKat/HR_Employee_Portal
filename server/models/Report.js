const { Schema, model } = require("mongoose");

const reportSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    housingID: {
        type: Schema.Types.ObjectId, ref: 'Housing'
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
        enum: ['open', 'closed','in progress'],
        default: 'open'
    }

});

const Report = model("Report", reportSchema);
module.exports = Report;