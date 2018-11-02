const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen("4444", () => {
  console.log("listning on 4444");
});
