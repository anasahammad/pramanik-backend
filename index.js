const http = require("http");
const app = require("./app/app.js");
// database connection
require("./config/db.config");
// create server
const server = http.createServer(app);
// listening port
server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
