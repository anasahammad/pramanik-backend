const mongoose = require("mongoose");

const dbConnect = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.error(err));
};
dbConnect();

