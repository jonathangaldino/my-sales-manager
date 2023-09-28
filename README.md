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

### Development

Feel free to hot on in each app folder and follow the guidelines to develop the project.

To run, use docker-compose, much easier.

### Build

To build all apps and packages, run the following command:

```bash
yarn run build
```

### Docker
Use docker compose to deploy a Postgres database, the backend app and the frontend app.


```bash
$ docker compose up -d
```

If is your first time deploying the database, you might need to create the database and the tables with Prisma.

```bash
$ yarn workspace api prisma migrate dev
```

Copy `/api/.env.example` to `/api/.env` and then run this command to run the migrations.

```bash
$ yarn workspace api prisma migrate dev
```


### Develop

To develop all apps and packages, run the following command:

```bash
yarn run dev
```

## Useful Links


- [Youtube video explaining the project](https://youtu.be/E6sB23hSeA8)
