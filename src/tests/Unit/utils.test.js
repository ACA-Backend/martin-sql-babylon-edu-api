import { updateEnv } from "../../lib/util.js";
import { config } from "dotenv";

test("it updates the environmental variables", () => {
  config();
  updateEnv({ NODE_ENV: "test" });
  expect(process.env.NODE_ENV).toBe("test");
});

test("it creates a new env variable if it does not exist", () => {
  config();
  updateEnv({ MAIL_HOST: "smtp.mailtrap.io" });
  expect(process.env.MAIL_HOST).toBe("smtp.mailtrap.io");
});

afterAll(() => {
  updateEnv({ NODE_ENV: "development" });
  // updateEnv({ MAIL_HOST: "" });
});
