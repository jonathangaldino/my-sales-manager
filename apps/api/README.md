# My Sales Manager (API)

The backend API behind MSM.

## Installation

```bash
$ yarn install
```

## Running the app

You might need a postgres database. You can use a cloud one OR deploy one through docker-compose.

The app requires some environment variables. Feel free to check them on `.env.example` file.


Before running the app, copy `.env.example` to a `.env` file and provide the rightful values:

```bash
$ copy .env.example .env

```

When you're done, use these scripts:


```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test


Integration tests are inside the `*.controller.spec.ts` files. They use `Supertest` to perform requests to the web server + they use the database - so spin up a local database to run them.

Jest is configured to spin-up a configured environment for our tests (check `jest.setup.ts`). Any spawn of environments will be running on a different db schema, so tests won't interfere with each other.

Create a `.env.testing` file with these variables (E.g):

```bash
DATABASE_URL='postgres://postgres:postgres@localhost:5432/mysalesmanager'

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres

```

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## API Docs

Spin up the local server and go to `http://localhost:3000/api`. We have swagger up and running.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
