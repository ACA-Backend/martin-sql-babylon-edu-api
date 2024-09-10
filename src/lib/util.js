import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { faker } from "@faker-js/faker";

export const updateEnv = (payload) => {
  const envPath = resolve(process.cwd(), ".env");
  const envVariables = readFileSync(envPath, "utf8").split("\n");

  // loop over the object we are receiving as a parameter
  for (const [key, value] of Object.entries(payload)) {
    // write a regex to match the key and replace the value
    const regex = new RegExp(`${key}=.*`);

    // check the env variables for the existence of the key
    const keyExists = envVariables.some((envVar) => regex.test(envVar));

    // if the key exists, update the value
    if (keyExists) {
      envVariables.forEach((envVar, index) => {
        if (regex.test(envVar)) {
          envVariables[index] = `${key}=${value}`;
        }
      });
    } else {
      // if the key does not exist, push the new key value pair
      envVariables.push(`${key}=${value}`);
    }

    // write the updated env variables to the .env file
    writeFileSync(envPath, envVariables.join("\n"));
  }
};

export const asyncHandler = (fn) =>
  async function (req, res, next) {
    try {
      return await fn(req, res);
    } catch (error) {
      next(error);
    }
  };

export const getSecondsFromNow = (seconds) => {
  const currentTime = new Date();
  currentTime.setSeconds(currentTime.getSeconds() + seconds);
  return currentTime.getTime() / 1000;
};

export const permissions = {
  books: {
    create: ["admin", "super admin"],
    read: ["user", "admin", "super admin"],
    update: ["admin", "super admin"],
    delete: ["admin", "super admin"],
  },
  authors: {
    create: ["admin", "super admin"],
    read: ["user", "admin", "super admin"],
    update: ["admin", "super admin"],
    delete: ["admin", "super admin"],
  },
  user: {
    create: ["admin", "super admin"],
    read: ["admin", "super admin"],
    update: ["admin", "super admin"],
    delete: ["admin", "super admin"],
  },
  role: {
    create: ["super admin"],
    read: ["super admin"],
    update: ["super admin"],
    delete: ["super admin"],
  },
};

export function getOperationType(method) {
  let operation;
  switch (method) {
    case "post":
      operation = "create";
      break;
    case "get":
      operation = "read";
      break;
    case "put":
      operation = "update";
      break;
    case "delete":
      operation = "delete";
      break;
    default:
      operation = "read";
  }
  return operation;
}

export async function aggregateResults(model, payload) {
  // create an aggregation pipeline and return the results
  return await model.find(payload);
}

export function paginate(results, query) {
  const myCustomLabels = {
    limit: "perPage",
    page: "currentPage",
    nextPage: "next",
    prevPage: "prev",
    totalPages: "pages",
    pagingCounter: "slNo",
    meta: "meta",
  };

  const options = {
    page: 1,
    limit: 20,
    customLabels: myCustomLabels,
  };

  if (query) {
    const { page, limit } = query;
    options.page = (page && parseInt(page)) || 1;
    options.limit = (limit && parseInt(limit)) || 20;
    return results.paginate({}, options);
  }

  return results.paginate({}, options);
}

export const generateBooksWithAuthors = () => {
  let books = [];

  for (let i = 1; i <= 1000; i++) {
    let authors = [];

    // Generate 1-3 authors for each book
    let numberOfAuthors = Math.floor(Math.random() * 3) + 1;
    for (let j = 1; j <= numberOfAuthors; j++) {
      authors.push({
        name: faker.person.fullName(),
        bio: faker.person.bio(),
        website: faker.internet.url(),
      });
    }

    const bookGenres = [
      "Science Fiction",
      "Fantasy",
      "Mystery",
      "Thriller",
      "Romance",
      "Western",
      "Dystopian",
      "Contemporary",
      "Historical",
      "Horror",
    ];

    books.push({
      // set the title to capitalized words
      title: String(faker.lorem.words())
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      genre: bookGenres[Math.floor(Math.random() * bookGenres.length)],
      publisher: faker.company.name(),
      publicationDate: faker.date
        .past({ years: 20 })
        .toISOString()
        .split("T")[0],
      authors: authors,
      isbn: faker.number.int({ min: 1000000 }),
      previewImage: faker.image.urlLoremFlickr({
        category: "books",
      }),
      availableCopies: faker.number.int({ min: 1, max: 100 }),
    });
  }

  return books;
};
