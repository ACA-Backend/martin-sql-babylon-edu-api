import { server } from "./bootstrap/server.js";
import config from "./config/app.config.js";
import { connectToDatabase } from "./config/db.config.js";
import { updateEnv } from "./lib/util.js";

(() => {
  try {
    updateEnv({ NODE_ENV: "development" });
    connectToDatabase();
    server.listen(config.port, () => {
      console.info(`Server is running on port: ${config.port}`);
    });
  } catch (error) {
    console.error.bind(console, "The server could not be started");
    process.exit(1);
  }
})();
