const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
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
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }

});

const Comment = model("Comment", commentSchema);
module.exports = Comment;