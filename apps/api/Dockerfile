########################################################################
#### builder
########################################################################
FROM node:18-alpine AS builder

RUN apk update

# Set working directory
WORKDIR /app

RUN yarn global add turbo

# Copy the docs package.json
COPY . .

RUN turbo prune --scope=api --docker

########################################################################
#### installer
########################################################################
FROM node:18-alpine AS installer

WORKDIR /app

RUN apk update

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/turbo.json ./turbo.json
RUN yarn install --frozen-lockfile

########################################################################
#### sourcer
########################################################################

FROM node:18-alpine AS sourcer

WORKDIR /app

# What is this doing
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .


# Use turbo to call NestCLI and generate the build of the nest js app
RUN yarn turbo run build --scope=api --include-dependencies --no-deps

########################################################################
#### runner
########################################################################
FROM node:18-alpine as runner

# Expose default port of nestjs?
EXPOSE 3000

# Our app will be inside /nestapp folder
WORKDIR /nestapp

COPY --from=installer /app/ .

COPY --from=sourcer /app/apps/api/dist ./apps/api/src

# Copy prisma schema file
COPY --from=sourcer /app/apps/api/src/persistence/prisma/schema.prisma /nestapp/apps/api/src/persistence/prisma/schema.prisma

# Generate prisma classes
RUN yarn turbo run db:generate --scope=api

CMD [ "node", "apps/api/src/main.js" ]
