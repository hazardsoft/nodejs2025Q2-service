# Home Library Service

## Installing NPM modules

```
npm install
```

## Environment

Duplicate `.env.example`, rename to `.env` and set `PORT` if necessary.

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

## Docker images: build

```sh
Rest API:
docker build --tag hazardsoft/library-rest-api --file Dockerfile .
```

## Docker images: run

```sh
Rest API:
docker run --publish 4000:4000 -d hazardsoft/library-rest-api
```

## Docker images: publish

```sh
Rest API:
docker push hazardsoft/library-rest-api
```
