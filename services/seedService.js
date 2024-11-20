const seedRepo = require("../repositories/seedRepository");
const seedData = async (session) => {
  return await seedRepo.seedData(session);
};
const findByEmail = async () => {
  return await seedRepo.findByEmail();
};
module.exports = {
  seedData,
  findByEmail,
};
