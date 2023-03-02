const { Thought, User } = require('../models');

module.exports = {
    // GET all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // GET a single thought by _id

    // POST a new thought using thoughtText and username. Push thought _id to user's thoughts array field
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((user) => 
                !user
                    ? res.status(404).json({
                        message: 'Thought created, but found no user with that username',
                    })
                    : res.json('Created the thought!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // PUT to update a thought by its _id

    // DELETE to remove a thought by its _id
};