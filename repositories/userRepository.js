const User = require('../models/User');

class UserRepository {
    async findById(userId) {
        return await User.findById(userId);
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async createUser(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async updateUser(userId, updateData) {
        return await User.findByIdAndUpdate(userId, updateData, { new: true });
    }

    async deleteUser(userId) {
        return await User.findByIdAndDelete(userId);
    }
}

module.exports = new UserRepository();
