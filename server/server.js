require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const flagsRoutes = require('./routes/flagsRoutes');
const reconciliationRoutes = require("./routes/reconciliationRoutes");
const rateLimiterRoutes = require('./routes/rateLimiterRoutes');
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api', flagsRoutes);
app.use('/api/', rateLimiterRoutes);
app.use("/api/reconciliation", reconciliationRoutes);

app.use(errorHandler);

connectDB()
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
