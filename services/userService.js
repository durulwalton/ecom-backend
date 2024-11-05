const userRepository = require('../repositories/userRepository');

class UserService {
    async getUserById(userId) {
        return await userRepository.findById(userId);
    }

    async createUser(userData) {
        // Add any business logic here, e.g., validation or additional data processing
        return await userRepository.createUser(userData);
    }

    async updateUser(userId, updateData) {
        return await userRepository.updateUser(userId, updateData);
    }

    async deleteUser(userId) {
        return await userRepository.deleteUser(userId);
    }
}

module.exports = new UserService();
