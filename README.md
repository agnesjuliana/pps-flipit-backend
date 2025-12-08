# Playground Flip It Back-end

## How To Run This Project

1. Clone this project

```
git clone https://github.com/agnesjuliana/flip-it-server.git
```

2. Copy `.env.sample` to `.env.development` to configure a custom environment

```
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASS=
DATABASE_PORT=
DATABASE_HOST=
PORT=
NODE_ENV="development"
```

3. Run `yarn install`

4. If you want to use docker for the database, run `yarn setup:dev`

5. Then run `yarn migrate:dev` and then `yarn seed:dev`

6. To run the project, run `yarn start:dev`

7. You can add the api endpoint to the `api.rest` file for testing if you don't want to use postman

- You can install `REST client` to run the `api.rest` file

- https://marketplace.visualstudio.com/items?itemName=MadsKristensen.RestClient
