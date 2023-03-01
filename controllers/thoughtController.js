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

    // PUT to update a thought by its _id

    // DELETE to remove a thought by its _id
};