const app = require('./app');
const config = require('./config');
const logger = require('./utils/logger');

const PORT = config.port;

app.listen(PORT, () => {
  console.log("Post",PORT)
  logger.info(`Server is running on port ${PORT}`);
});