const connection = require('../config/connection');
const { User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async() => {
    console.log('connected');

    // Drop existing users
    await User.deleteMany({});

    // test seed
    const user = new User();
    user.username = 'ryan';
    user.email = 'ryan@ryan.com';

    // test validate
    await user.validate();

    // if valid, insert into collection
    await User.collection.insertOne(user);

    console.info('Seeding complete! 🌱');
    process.exit(0);
});