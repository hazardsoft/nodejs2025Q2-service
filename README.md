# Home Library Service

## Installing NPM modules

```
npm install
```

## Environment

Create 2 config files out of `.env.example` via copy/paste:

1. `.env` file to be used to local development (set `POSTGRES_HOST` variable to `localhost`);
2. `.env.docker` to be used by Docker (make sure that `POSTGRES_HOST` is set to `database-service`).

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing <http://localhost:4000/doc/>.
For more information about OpenAPI/Swagger please visit <https://swagger.io/>.

## Swagger UI

You can serve Swagger UI locally to test API.

```
npm run docs
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
e.g. npm run tes -- test/users.e2e.spec.ts (will run tests for users only)
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

## Docker

### Build images

Rest API:

```sh
docker build --tag hazardsoft/library-rest-api --file Dockerfile .

```

PostgreSQL:

```sh
docker build --tag hazardsoft/library-database --file docker/db/Dockerfile .
```

### Run images

Rest API:

```sh
docker run --publish 4000:4000 -d hazardsoft/library-rest-api
```

PostgreSQL:

```sh
docker run --publish 5432:5432 -d hazardsoft/library-database
```

### Publish images

Rest API:

```sh
docker push hazardsoft/library-rest-api
```

PostgreSQL:

```sh
docker push hazardsoft/library-database
```

### Run Application

Docker Compose is used to run application (REST API application and PostgreSQL server will be started).
There are 2 modes of running application: development and production.
Each mode has distinguishing features described below:

**N.B. Application can not be run in both mode simultaneously (in that case `port is already allocated` error can be seen in the console), if one mode already started and you want to start another one, please stop already running first.**

#### Development Mode

Development mode is used for local development specifically and has number of distinguising features:

1. dedicated [Dockerfile-dev](./docker/rest/Dockerfile-dev) file is used to build REST API image (includes dev dependencies from `package.json`)
2. `src` and `test` local folders are binded to the REST API container to enable watch mode and provide ability to run tests in the container;
3. REST API application port is exposed to `localhost` so it can be tested locally (e.g. via Postman or http://localhost/doc Swagger docs);
4. Logs are enabled for PostgreSQL server;
5. PostgreSQL data and logs are stored in dedicated docker volumes (so they can be checked even after containers are stopped/destroyed);
6. PostgreSQL server port is exposed to `localhost` so a UI client (e.g. DBeaver) can be used to explore DB data.

```sh
start:
docker compose --env-file .env.docker up --build --detach

stop:
docker compose down
```

#### Production Mode

Production mode is introduced for CI/CD use primarily and has number of distinguising features:

1. REST API service start depends on PostgreSQL service start after successful healthcheck only;
2. REST API and PostgreSQL both belong to the same custom network and use that network for communication: REST API is exposed to `localhost` while PostgreSQL not (can be accessed by REST API service only, no other container can communicate with PostgreSQL container);
3. REST API uses dedicated [Dockerfile](./docker/rest/Dockerfile) that does not include any dev dependencies from `package.json`;
4. No dedicated volumes are used to store data/logs;
5. None of local folders are bind mounted (dev watch and tests are not accessible).

```sh
start:
docker compose -f docker-compose-prod.yml --env-file .env.docker up --build --detach

stop:
docker compose -f docker-compose-prod.yml down
```
