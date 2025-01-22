const http = require("http");
require("dotenv").config();
const app = require("./app/app");
// database connection
require("./config/db.config");
// create server
const server = http.createServer(app);
// listening port
server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
