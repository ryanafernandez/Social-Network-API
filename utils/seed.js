const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async() => {
    console.log('connected');

    // Drop existing users and thoughts
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Thought seeds
    const thoughts = [];
    const thoughtOne = new Thought();
    thoughtOne.thoughtText = 'hello friend';
    thoughtOne.username = 'ryan';

    const thoughtTwo = new Thought();
    thoughtTwo.thoughtText = 'I am here!';
    thoughtTwo.username = 'bond';

    // Reaction Seeds
    const reactions = [
        {
            reactionBody: 'Great thought!',
            username: 'bond',
        },
        {
            reactionBody: 'Thanks bond!',
            username: 'ryan',
        }
    ];

    thoughtOne.reactions = reactions;
    thoughts.push(thoughtOne);
    thoughts.push(thoughtTwo);

    // User seeds
    const users = [];
    const userOne = new User();
    userOne.username = 'ryan';
    userOne.email = 'ryan@ryan.com';
    userOne.thoughts = [thoughtOne];
    await userOne.validate();

    const userTwo = new User();
    userTwo.username = 'bond';
    userTwo.email = 'james@bond.com';
    userTwo.thoughts = [thoughtTwo];
    await userTwo.validate();

    users.push(userOne);
    users.push(userTwo);

    // Insert seed data
    await Thought.collection.insertMany(thoughts);
    await User.collection.insertMany(users);


    console.info('Seeding complete! 🌱');
    process.exit(0);
});