const express = require("express");
require("dotenv").config();

const connectToMongo = require("./db/connection");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();
const port = process.env.NODE_LOCAL_PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});

module.exports = app;