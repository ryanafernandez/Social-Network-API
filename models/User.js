const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'Username is required'],
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email address is required'],
            validate: {
                // return regex.test(v)
                validator: function(v) {
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
                },
                message: 'Please enter a valid email address',
            },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

userSchema
    .virtual('friendCount')
    .get(function() {
        return `${this.friends.length}`;
    })
    .set(function() {
        const friendCount = this.friends.length;
        this.set(friendCount);
    });

const User = model('user', userSchema);

module.exports = User;