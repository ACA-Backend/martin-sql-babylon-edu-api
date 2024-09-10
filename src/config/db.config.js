import config from "./app.config.js";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(config.db[config.environment], {
  dialect: "postgres",
  logging: config.environment === "development",
});

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export const wipeDatabase = async () => {};

export const clearDatabaseDocs = async (model) => {};
