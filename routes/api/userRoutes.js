const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    // createUser,
    // updateUser,
    // deleteUser,
    // addFriend,
    // removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers); //.post(createUser).put(updateUser).delete(deleteUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser);

// /api/users/:userId/friends/:friendId
// router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;