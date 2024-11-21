const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const articleRoutes = require("./routes/articleRoutes");
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const bookAuthorRoutes = require("./routes/bookAuthorRoutes");
const fileApproverRoutes = require("./routes/fileApproverRoutes");
const errorHandler = require("./middlewares/errorHandler");
const { connectDB } = require("./config/db");
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use(limiter);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/books-authors", bookAuthorRoutes);
app.use("/api/file-approvers", fileApproverRoutes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
