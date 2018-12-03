express-flags is a small plugin that provides a cascading feature flag implementation for Express.

You initialise it with a set of base flags (from a json file or similar)

You can then override the base flags with flags in:
* ENV variables
* Cookies

## Installation

```
$ npm install express-flags
```

## Usage

```js
const expressFlags = require('express-flags')
const baseFlags = require('your-flags.json')
const featureFlags = expressFlags({
  env: /^FLAG_/,
  cookies: /^FLAG_/,
  flags: baseFlags
})

app.use(featureFLags)

```

## Running tests

Install dependencies:

```shell
$ npm install
```
Run tests:

```shell
$ npm test
```

## License

MIT