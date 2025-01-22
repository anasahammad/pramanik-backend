require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", require("../routes/auth.route.js"));
app.use("/api/admin", require("../routes/admin.route.js"));
app.use("/api/customer", require("../routes/customer.route.js"));

app.get("/", (req, res) => {
  res.send("Server is running");
});
// invalid route
app.all("*", (req, res) => {
  res.send("Invalid route");
});

module.exports = app;
