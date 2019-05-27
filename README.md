Apollo datasource mocks example
---

This example shows one approach to unit testing [Apollo data sources](https://www.apollographql.com/docs/apollo-server/features/data-sources). It uses [`jest`](https://jestjs.io/) but could easily be replaced by something like mocha and sinon since it does not rely on jest's module mocking functionality.


```
npm install
npm test
```

Background
---

I've struggled with trying to mock out datasources for unit tests (Apollo provides some wonderful [GraphQL mocks](https://www.apollographql.com/docs/apollo-server/features/mocking), but I want to go down a layer to be able to test logic within my datasources). After attempting to things like [fetch-mock](https://www.npmjs.com/package/fetch-mock) alongside [`jest`'s](https://jestjs.io/) module mocking features, but had little luck with those approaches due to the nature of how `apollo-datasource-rest` depends on `apollo-server-env` which then includes in `node-fetch`.

I'd be _very_ open to an approach that uses something like `fetch-mock` to mock at innermost layer (and avoid the need for wrapper code) if it also does not require knowledge of `apollo-*` internals.
