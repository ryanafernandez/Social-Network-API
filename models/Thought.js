const { Schema, model } = require('mongoose');

// Schema to create User model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, 'Cannot enter empty thought'],
            trim: true,
        },
        createdAt: {
            type: Date,
            minLength: 1,
            maxLength: 280,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [],
    },
    {
        toJSON: {
            virtuals: true,
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

const Thought = model('thought', thoughtSchema);

module.exports = Thought;