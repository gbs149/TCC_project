import { app } from "./app";

const port = process.env.PORT || 3000;

const server = app.listen(port);
console.log(`Started on port ${port}`);

process.on("SIGINT", () => {
  console.warn("stopped accepting new connections");
  server.close(async () => {
    console.info("closed");
    // await database.close();
    process.exit(0);
  });
});
