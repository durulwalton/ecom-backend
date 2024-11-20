const mongoose = require("mongoose");
const seedService = require("./services/seedService");
const { connectDB } = require("./config/db");
const transferFunds = async () => {
  connectDB();
  const session = await mongoose.startSession();
  try {
    let user = await seedService.findByEmail();
    if (!user) {
      console.log("Start Transaction");
      session.startTransaction();
      await seedService.seedData(session);
      await session.commitTransaction();
      console.log("End Transaction");
    } else {
      console.log("Already has data");
    }
  } catch (error) {
    console.error("Transaction abort For:", error);
    await session.abortTransaction();
  } finally {
    session.endSession();
    process.exit(1);
  }
};
transferFunds();
