const userService = require('../services/userService');

exports.getUser = async (req, res) => {
    try {
        const user = await userService.findUserById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
