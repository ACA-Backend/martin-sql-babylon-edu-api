import { app } from "../../bootstrap/server.js";
import request from "supertest";
import { updateEnv } from "../../lib/util.js";
import { connectToDatabase } from "../../config/db.config.js";
import * as userService from "../../app/services/user.service.js";
import { faker } from "@faker-js/faker";
import seeder from "../../lib/seeder.js";

beforeAll(async () => {
  updateEnv({ NODE_ENV: "test" });
  connectToDatabase();
  // here we will seed the database and add admins users
  for(const user of seeder["super admins"]) {
    await userService.createUser(user);
  } 
});

afterEach(async () => {
  await userService.deleteUsers({ role: "user" });
});

describe("Tests for the permissions unit", () => {
  // test("A user can view books", async () => {
  //   await request(app).post("/api/v1/auth/register").send({
  //     email: "briandiaz@yahoo.co.uk",
  //     username: "briandiaz",
  //     password: "password",
  //   });

  //   const loginRequest = await request(app).post("/api/v1/auth/login").send({
  //     email: "briandiaz@yahoo.co.uk",
  //     password: "password",
  //   });

  //   const cookies = loginRequest.header["set-cookie"][0];
  //   const token = cookies.split("=")[1].split(";")[0];

  //   const response = await request(app)
  //     .get("/api/v1/books")
  //     .set("Cookie", [`authentication=${token}`])
  //     .send();

  //   expect(response.status).toBe(200);
  //   expect(response.body.success).toBe(true);
  //   expect(response.body.data).toHaveProperty("books");
  // });

  // test("A user cannot create a new book record", async () => {
  //   await request(app).post("/api/v1/auth/register").send({
  //     email: "briandiaz@yahoo.co.uk",
  //     username: "briandiaz",
  //     password: "password",
  //   });

  //   const loginRequest = await request(app).post("/api/v1/auth/login").send({
  //     email: "briandiaz@yahoo.co.uk",
  //     password: "password",
  //   });

  //   const cookies = loginRequest.header["set-cookie"][0];
  //   const token = cookies.split("=")[1].split(";")[0];

  //   const response = await request(app)
  //     .post("/api/v1/books")
  //     .set("Cookie", [`authentication=${token}`])
  //     .send({
  //       title: faker.lorem.words(2),
  //       genre: "Horror",
  //       publisher: faker.company.name(),
  //       publicationDate: faker.date
  //         .past({ years: 15 })
  //         .toISOString()
  //         .split("T")[0],
  //       isbn: faker.number.int({ min: 1000000 }),
  //       previewImage: faker.image.urlLoremFlickr({
  //         category: "books",
  //       }),
  //       authors: [
  //         {
  //           name: faker.person.fullName(),
  //           bio: faker.person.bio(),
  //           website: faker.internet.url(),
  //         },
  //         {
  //           name: faker.person.fullName(),
  //           bio: faker.person.bio(),
  //           website: faker.internet.url(),
  //         },
  //       ],
  //     });

  //   expect(response.status).toBe(403);
  //   expect(response.body.success).toBe(false);
  //   expect(response.body.message).toBe(
  //     "You do not have permission to access this resource"
  //   );
  // });

  test("A user cannot update a book record", async () => {
    await request(app).post("/api/v1/auth/register").send({
      email: "briandiaz@yahoo.co.uk",
      username: "briandiaz",
      password: "password",
    } );

    const adminLoginRequest = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "joedoe@gmail.com",
      password: "admin123",
      });

    const adminCookies = adminLoginRequest.header["set-cookie"][0];
    const adminToken = adminCookies.split( "=" )[ 1 ].split( ";" )[ 0 ];
    
    console.log( adminToken );

    // const adminResponse = await request(app)
    //   .post("/api/v1/books")
    //   .set("Cookie", [`authentication=${adminToken}`])
    //   .send({
    //     title: faker.lorem.words(2),
    //     genre: "Horror",
    //     publisher: faker.company.name(),
    //     publicationDate: faker.date
    //       .past({ years: 15 })
    //       .toISOString()
    //       .split("T")[0],
    //     isbn: faker.number.int({ min: 1000000 }),
    //     previewImage: faker.image.urlLoremFlickr({
    //       category: "books",
    //     }),
    //     authors: [
    //       {
    //         name: faker.person.fullName(),
    //         bio: faker.person.bio(),
    //         website: faker.internet.url(),
    //       },
    //       {
    //         name: faker.person.fullName(),
    //         bio: faker.person.bio(),
    //         website: faker.internet.url(),
    //       },
    //     ],
    //   } );


    // const loginRequest = await request(app).post("/api/v1/auth/login").send({
    //   email: "briandiaz@yahoo.co.uk",
    //   password: "password",
    // });

    // const cookies = loginRequest.header["set-cookie"][0];
    // const token = cookies.split("=")[1].split(";")[0];

    // const response = await request(app)
    //   .put(`/api/v1/books/${data.book._id}`) // concatenate the book id here
    //   .set("Cookie", [`authentication=${token}`])
    //   .send({
    //     title: faker.lorem.words(2),
    //     genre: "Horror",
    //     publisher: faker.company.name(),
    //     publicationDate: faker.date
    //       .past({ years: 15 })
    //       .toISOString()
    //       .split("T")[0],
    //     isbn: faker.number.int({ min: 1000000 }),
    //     previewImage: faker.image.urlLoremFlickr({
    //       category: "books",
    //     }),
    //     authors: [
    //       {
    //         name: faker.person.fullName(),
    //         bio: faker.person.bio(),
    //         website: faker.internet.url(),
    //       },
    //     ],
    //   });

    // expect(response.status).toBe(403);
    // expect(response.body.success).toBe(false);
    // expect(response.body.message).toBe(
    //   "You do not have permission to access this resource"
    // );
  });

  // test("A user cannot delete a book record", async () => {
  //   await request(app).post("/api/v1/auth/register").send({
  //     email: "briandiaz@yahoo.co.uk",
  //     username: "briandiaz",
  //     password: "password",
  //   });

  //   const loginRequest = await request(app).post("/api/v1/auth/login").send({
  //     email: "briandiaz@yahoo.co.uk",
  //     password: "password",
  //   });

  //   const cookies = loginRequest.header["set-cookie"][0];
  //   const token = cookies.split("=")[1].split(";")[0];

  //   const response = await request(app)
  //     .post("/api/v1/books")
  //     .set("Cookie", [`authentication=${token}`])
  //     .send({
  //       title: faker.lorem.words(2),
  //       genre: "Horror",
  //       publisher: faker.company.name(),
  //       publicationDate: faker.date
  //         .past({ years: 15 })
  //         .toISOString()
  //         .split("T")[0],
  //       isbn: faker.number.int({ min: 1000000 }),
  //       previewImage: faker.image.urlLoremFlickr({
  //         category: "books",
  //       }),
  //       authors: [
  //         {
  //           name: faker.person.fullName(),
  //           bio: faker.person.bio(),
  //           website: faker.internet.url(),
  //         },
  //         {
  //           name: faker.person.fullName(),
  //           bio: faker.person.bio(),
  //           website: faker.internet.url(),
  //         },
  //       ],
  //     });

  //   expect(response.status).toBe(403);
  //   expect(response.body.success).toBe(false);
  //   expect(response.body.message).toBe(
  //     "You do not have permission to access this resource"
  //   );
  // });
});
