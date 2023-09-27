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

RUN turbo prune --scope=web --docker

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
RUN yarn turbo run build --scope=web --include-dependencies --no-deps

########################################################################
#### runner
########################################################################

FROM nginx:alpine as runner

# Copy the built React app from the build stage
COPY --from=sourcer /app/apps/web/build/ /usr/share/nginx/html

# Copy your custom Nginx configuration
COPY --from=sourcer /app/apps/web/nginx.conf /etc/nginx/conf.d/

# Expose port 80 for the web server
EXPOSE 80

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Start the Nginx web server
CMD ["nginx", "-g", "daemon off;"]
