
# Babylon Edu Library Management System API

This is the API project we will work on for month one. This library system API will handle the CRUD functionality for our Library system and power the frontend of our application. This application is a robust implementation of the best practices in software development with Node js and express.



## Features

- User registration and login (JWT authentication).
- CRUD operations for books (title, author, ISBN, published date).
- CRUD operations for authors (name, bio).
- CRUD operations for users (name, email, password).
- API documentation using Postman.


## Documentation

https://documenter.getpostman.com/view/25387596/2sA3s1nX48


## Contributing

The work to be done in this project is divided according to teams. Each team will work on the aspect of the project assigned to them and will ensure that they follow best practices and maintain the highest standards in the development of this application. The team divisions will be shared in class and each team is to push their work to separate branches depending on what they are working on.

### Month One

#### Team One

Team one will be responsible for setting up the application and completing the user authentication and authorization module. Team one will also write unit tests associated with the module they have developed and these tests should be behaviour driven(BDD).

#### Team Two

Team two will be responsible for the CRUD operations associated with the books part of the application. This means that they will have to establish the relationship between the books and the authors. The team will also write tests associated with the module and each test must be behaviour driven(BDD)

#### Team Three

Team three will be responsible for the CRUD operations associated with the authors part of the application. This means that they will have to establish the relationship between the authors and the books. The team will aso write tests associated with the module and each test must be behaviour driven(BDD)

#### Team Four

Team four will write the API documentation for this application with Postman and will update this README document with the link to the document when they are done. They will also generate test coverage reports from the tests written by the other team members.
## Teams 

### Month One

#### Team One
- [Ikwuka Martin](mailto:martinsomto2001@gmail.com)
- [Chidi Golibe](mailto:golibechidi@gmail.com)
- [Jonathan West](mailto:medyl@gmail.com)

#### Team Two
- [Chukwunwenwa Collins](mailto:nwokolochuks123@gmail.com)
- [Chinwe Obianyo](mailto:cegrads13@gmail.com)
- [Okogu Melitus](mailto:melitusonyeachonam@gmail.com)

#### Team Three
- [Odiana Israel](mailto:odianadesdev@gmail.com)
- [Angel Simon](mailto:nmajane1405@gmail.com)
- [Aminu Altine](mailto:aminualtine99@gmail.com)

#### Team Four
- [Jewel Osonwa-Paul](mailto:jewelchidinma@gmail.com)
- [Nwatu Ugochukwu](mailto:ugodavid2002@gmail.com)
- [Anthony-Aniebue Bryant](mailto:ugochukwubryant@gmail.com)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NOE_ENV`

`PORT`

`MONGODB_URI`

`JWT_SECRET`

`JWT_EXPIRES_AT`


## Installation

To get started clone this repository, create a branch for your team

```bash
  git clone https://github.com/ACA-Backend/babylon-edu-api.git

  cd babylon-edu-api

  git checkout -b team-[team number]/feature
```

Install dependencies, copy the .env file and populate the variables, then start your application

```bash
  npm install

  cp .env.example .env

  npm run start:dev
```

To checkout a branch

```bash
  git checkout team-[team number]/feature

  npm install
```

To see all the branches on the repository
```bash
  git branch -a
```

To run the tests you run the following command

```bash
  npm test
```


## Submission and Presentaion

The link for submission will be made available the day before the project is to be submitted. The day the project is to be submitted will also be demo day for the work everyone has done

