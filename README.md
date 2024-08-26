[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## .proto files

1. Add new services or messages to `src/protos`

```bash
# to create TypeScript interfaces
$ yarn run proto-gen
```

## Migrations

1. Prepare your .env files in /envs folder (**local.env** for your local machine)

```bash
# to show migrations
$ yarn run migration:show

# to generate migrations
$ yarn run migration:generate "src/typeorm/migrations/YOUR_MIGRATION_NAME"

# to apply migrations
$ yarn run migration:run

# to revert migrations
$ yarn run migration:down

# to create a new migration
$ yarn run migration:create "src/typeorm/migrations/YOUR_MIGRATION_NAME/"
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
