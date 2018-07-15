# Fintegrase

This boilerplate include the following features:

- Log rotation and log management using [Bunyan](https://github.com/trentm/node-bunyan)
- A super small and optimized [Docker](https://www.docker.com/) image based on Alpine image
- [Swagger](https://swagger.io/) API documentation based on JSDoc
- Continuous integration and delivery using [CircleCI](https://circleci.com/)
- Unit Test and Integration Test along with Test Coverage using [Jest](https://facebook.github.io/jest/) testing framework

---


## Getting Started

```base
$ yarn
$ yarn start
```


## Commands

### Run

```bash
# Run normally
$ yarn start
# Run the application with nodemon for development
$ yarn dev
```

### Test

```base
# Test
$ yarn test                           # Run all test
$ yarn test:unit                      # Run only unit test
$ yarn test:integration               # Run only integration test
# Test (Watch Mode for development)
$ yarn test:watch                     # Run all test with watch mode
$ yarn test:watch:unit                # Run only unit test with watch mode
$ yarn test:watch:integration         # Run only integration test with watch mode
# Test Coverage
$ yarn test:coverage                  # Calculate the coverage of all test
$ yarn test:coverage:unit             # Calculate the coverage of unit test
$ yarn test:coverage:integration      # Calculate the coverage of integration test
# Test consistent coding style (Lint)
$ yarn lint                           # Lint all sourcecode
$ yarn lint:app                       # Lint app sourcecode
$ yarn lint:test                      # Lint test sourcecode
```

### Archive

```bash
$ yarn pack
```

## License

Provided under the terms of the [MIT License](./LICENSE).

Copyright © 2018, [Byungjin Park](http://www.posquit0.com).
Copyright © 2018 [Wang, Tao](https://miffyliye.org/).
