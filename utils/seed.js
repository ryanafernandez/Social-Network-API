const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async() => {
    console.log('connected');

    // Drop existing users and thoughts
    await User.deleteMany({});
    await Thought.deleteMany({});

    // test Thought seed
    const thought = new Thought();
    thought.thoughtText = 'hello friend';
    thought.username = 'ryan';

    // test Reaction Seed
    const reactions = [
        {
            reactionBody: 'Great thought!',
            username: 'ryan',
        },
        {
            reactionBody: 'Just kidding, that was not very good',
            username: 'ryan',
        }
    ];

    thought.reactions = reactions;
    console.log(reactions);
    console.log(thought.reactions);

    // test User seed
    const userOne = new User();
    userOne.username = 'ryan';
    userOne.email = 'ryan@ryan.com';
    userOne.thoughts = [thought];
    await userOne.validate();

    const userTwo = new User();
    userTwo.username = 'bond';
    userTwo.email = 'james@bond.com';
    await userTwo.validate();

    // test adding seed data
    await Thought.collection.insertOne(thought);
    await User.collection.insertOne(userOne);
    await User.collection.insertOne(userTwo);
    


    console.info('Seeding complete! 🌱');
    process.exit(0);
});