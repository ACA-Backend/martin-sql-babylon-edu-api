import { app } from "../../bootstrap/server.js";
import request from "supertest";
import { updateEnv } from "../../lib/util.js";
import { connectToDatabase } from "../../config/db.config.js";
import * as userService from "../../app/services/user.service.js";

//Assignment 5: Write the tests for this auth module with what is already existing

beforeAll(() => {
  updateEnv({ NODE_ENV: "test" });
  connectToDatabase();
});

afterEach(async () => {
  await userService.deleteUsers({ role: "user" });
});

// 1. Checkout your branch
// 2. Merge the changes from my branch into yours
// 3. Write the tests in this file
// 4. Push the changes to your branch

//. REMEMBER TO USE NPM AS YOUR PACKAGE MANAGER, ONE YOU MERGE THE CHANGES DELETE THE PNPM-LOCK.YAML FILE BEFORE YOU RUN NPM INSTALL

describe("Tests for the auth module", () => {
  describe("Tests for the register endpoint", () => {
    test("A user can create an account", async () => {
      const response = await request(app).post("/api/v1/auth/register").send({
        email: "briandiaz@yahoo.co.uk",
        username: "briandiaz",
        password: "password",
      });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User registered successfully");
    });

    test("A user cannot create an account with an existing email or username", async () => {
      await request(app).post("/api/v1/auth/register").send({
        email: "briandiaz@yahoo.co.uk",
        username: "briandiaz",
        password: "password",
      });

      const response = await request(app).post("/api/v1/auth/register").send({
        email: "briandiaz@yahoo.co.uk",
        username: "briandiaz",
        password: "password",
      });

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "A user with the provided details already exists"
      );
    });

    test("A user cannot create an account with incomplete details", async () => {
      const response = await request(app).post("/api/v1/auth/register").send({
        email: "briandiaz@yahoo.co.uk",
      });

      expect(response.status).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "The request failed with the following errors"
      );
      expect(response.body).toHaveProperty("errors");
    });
  });

  describe("Tests for the login endpoint", () => {
    test("A user can login with the correct credentials", async () => {
      await request(app).post("/api/v1/auth/register").send({
        email: "briandiaz@yahoo.co.uk",
        username: "briandiaz",
        password: "password",
      });

      const response = await request(app).post("/api/v1/auth/login").send({
        email: "briandiaz@yahoo.co.uk",
        password: "password",
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User successfully logged in");
    });

    test("A user cannot login with the wrong password", async () => {
      await request(app).post("/api/v1/auth/register").send({
        email: "briandiaz@yahoo.co.uk",
        username: "briandiaz",
        password: "password",
      });

      const response = await request(app).post("/api/v1/auth/login").send({
        email: "briandiaz@yahoo.co.uk",
        password: "seriously secure password",
      });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "We could not validate your credentials, please try again"
      );
    });

    test("A user cannnot login with the wrong email", async () => {
      await request(app).post("/api/v1/auth/register").send({
        email: "briandiaz@yahoo.co.uk",
        username: "briandiaz",
        password: "password",
      });

      const response = await request(app).post("/api/v1/auth/login").send({
        email: "briandiaz@gmail.com",
        password: "password",
      });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "We could not validate your credentials, please try again"
      );
    });
  });

  describe("Tests for the autenticated user endpoint", () => {
    test("A logged in user can access the authenticated user route", async () => {
      await request(app).post("/api/v1/auth/register").send({
        email: "briandiaz@yahoo.co.uk",
        username: "briandiaz",
        password: "password",
      });

      const loginRequest = await request(app).post("/api/v1/auth/login").send({
        email: "briandiaz@yahoo.co.uk",
        password: "password",
      });

      const cookies = loginRequest.header["set-cookie"][0];
      const token = cookies.split("=")[1].split(";")[0];

      const response = await request(app)
        .get("/api/v1/auth/user")
        .set("Cookie", [`authentication=${token}`])
        .send();

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveProperty("user");
    });

    test("A user that is not logged in cannot access the authenticated user route", async () => {
      const response = await request(app).get("/api/v1/auth/user");

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Invalid credentials or missing token"
      );
    });
  });
});
