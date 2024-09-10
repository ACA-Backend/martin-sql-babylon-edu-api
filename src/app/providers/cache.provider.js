import { createClient } from "redis";
import appConfig from "../../config/app.config.js";

export default class CacheProvider {
  constructor() {
    let url;

    switch (appConfig.environment) {
      case "development":
        url = appConfig.redis.host;
        break;
      case "test":
        url = appConfig.redis.staging_host;
        break;
      default:
        url = appConfig.redis.url;
    }

    if ( appConfig.redis.state === "enabled" ) this.init( {
      password: appConfig.redis.password,
      socket: {
        host: url,
        port: appConfig.redis.port,
      }
    });
  }

  async init(payload) {
    this.client = await createClient(payload)
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();

    console.info("Redis client connected");
  }

  async set(key, value, expiration = 3600) {
    await this.client.set(key, JSON.stringify(value), {
      EX: expiration,
    });
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, value) => {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(value));
      });
    });
  }
}
