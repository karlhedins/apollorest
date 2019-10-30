# apollorest
A small example of a node-backend with express, apollo, graphql, external and internal REST API integration.

To run the app:
```bash
yarn install
yarn start
```

A graphql playground will be running on the following url:

http://localhost:4000/graphql

The app consists of the following files:

`src/app.js`
Express and apollo app combined. The GraphQL schema is defined here.
An example of how auth middleware could be used is commented out.

`src/genreFinder.js`
Example to simulate a database call - searches for music genres.

`src/genreRouter.js`
Internal REST API. Express router that uses the genreFinder.

`src/StarwarsApi.js`
External REST API. Shows how an external REST API could be wrapped for use in apollo.
