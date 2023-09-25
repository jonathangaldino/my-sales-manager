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


COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
RUN pwd && ls
RUN yarn turbo run build --scope=api --include-dependencies --no-deps
# RUN pnpm turbo run db:generate

# FROM node:16-alpine as runner
# WORKDIR /app
# COPY --from=sourcer /app/ .
# CMD [ "node", "apps/api/dist/main.js" ]
