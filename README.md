# My Sales Manager

MSM is an app built with Typescript, NestJS, Prisma and React to manage your sales (+ affiliates).

## What's inside?

This turborepo includes the following packages/apps:

### Apps and Packages

- `web`: a React app
- `api`: a Nestjs app
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Prisma](https://prisma.io/) for database ORM
- [Docker Compose](https://docs.docker.com/compose/) for local database


### Build

To build all apps and packages, run the following command:

```bash
yarn run build
```

### Docker
To build apps a generate docker images, you can run these two commands:

```bash
# for the api app
$ docker build -t my-sales-manager-api . -f ./apps/api/Dockerfile

# for the web app
$ docker build -t my-sales-manager-web . -f ./apps/web/Dockerfile
```

We also have a docker-compose at root folder of the project. Feel free to use it to deploy the web, the api and the database (postgres).

```bash
$ docker compose up -d
```

If is your first time deploying the database, you might need to create the database and the tables.
Create a database, we chose `my-sales-manager` as the default name, and then run prisma to deploy the migrations:

```bash
$ yarn workspace api prisma migrate dev
```


### Develop

To develop all apps and packages, run the following command:

```bash
yarn run dev
```

## Useful Links


- [Youtube video explaining the project](https://youtu.be/jnnSkj54fFM)
