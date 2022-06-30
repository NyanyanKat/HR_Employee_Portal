const { Schema, model } = require("mongoose");

const reportSchema = new Schema({
    reportID: {
        type: Schema.Types.ObjectId, 
        ref: 'Report',
        required: true
    },
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
    }

});

const Report = model("Report", reportSchema);
module.exports = Report;