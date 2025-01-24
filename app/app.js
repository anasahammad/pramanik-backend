require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "*"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // অনুমতি দিন
    } else {
      callback(new Error("Not allowed by CORS")); // ব্লক করুন
    }
  },
  credentials: true, // ক্রেডেনশিয়ালস অনুমতি দিন
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", require("../routes/auth.route.js"));
app.use("/api/admin", require("../routes/admin.route.js"));
app.use("/api/customer", require("../routes/customer.route.js"));
app.use("/api/category", require("../routes/category.route.js"));

app.get("/", (req, res) => {
  res.send("Server is running");
});
// invalid route
app.all("*", (req, res) => {
  res.send("Invalid route");
});

module.exports = app;
