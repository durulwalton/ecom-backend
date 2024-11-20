const userRepo = require("../repositories/userRepository");
const throwError = require("../utils/throwError");

exports.registerUser = async (userData) => {
  const { email, phoneNumber } = userData;
  const user = await userRepo.findByFields({
    $or: [{ email }, { phoneNumber }],
  });
  if (user) {
    throw throwError(`This User already Registered!`, 400);
  }
  return userRepo.createUser(userData);
};

exports.authenticateUser = async (email, password) => {
  const user = await userRepo.findByEmail(email);
  if (user && (await user.matchPassword(password))) {
    return user;
  }
  return null;
};
exports.getUserById = async (id) => {
  return userRepo.findUserById(id);
};
exports.findAuthUserById = async (id) => {
  return userRepo.findAuthUserById(id);
};
