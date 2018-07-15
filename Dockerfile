#
# Fintegrase
#
# build:
#   docker build -t fintegrase .
# run:
#   docker run --rm -it --name fintegrase-api -p 127.0.0.1:7071:7071 fintegrase
#
#

### BASE
FROM node:8.11.3-alpine AS base
LABEL maintainer "Wang, Tao <i@miffyliye.org>"
# Set the working directory
WORKDIR /app
# Copy project specification and dependencies lock files
COPY package.json yarn.lock ./
# Install yarn
RUN apk --no-cache add yarn


### DEPENDENCIES
FROM base AS dependencies
# Install Node.js dependencies (only production)
RUN yarn --production
# Copy production dependencies aside
RUN cp -R node_modules /tmp/node_modules
# Install ALL Node.js dependencies
RUN yarn


### TEST
FROM dependencies AS test
# Copy app sources
COPY . .
# Run linters and tests
#RUN yarn lint && yarn test
RUN yarn lint

### RELEASE
FROM base AS release
# Copy production dependencies
COPY --from=dependencies /tmp/node_modules ./node_modules
# Copy app sources
COPY . .
# Expose application port
EXPOSE 7071
# In production environment
ENV NODE_ENV production
ENV AUTH_KEY 7ae7ddd3
ENV ADMIN_AUTH_KEY 8bf8eee4
# Run
CMD yarn start
