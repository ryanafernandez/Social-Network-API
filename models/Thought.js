const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');



// Schema to create User model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, 'Cannot enter empty thought'],
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatTimestamp
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        }
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return `${this.reactions.length}`;
    })
    .set(function() {
        const reactionCount = this.reactions.length;
        this.set(reactionCount);
    });

function formatTimestamp(timestamp) {
    return `${timestamp.getMonth()+1}/${timestamp.getDate()}/${timestamp.getFullYear()} ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`;
}

const Thought = model('thought', thoughtSchema);

module.exports = Thought;