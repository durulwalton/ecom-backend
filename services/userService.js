const User = require('../models/User');

exports.findUserById = async (userId) => {
    return await User.findById(userId);
};
