express-flags is a small plugin that provides a cascading feature flag implementation for Express.

You initialise it with a set of base flags (from a json file or similar)

You can then override the base flags with flags in:
* ENV variables
* Cookies
* Session


## Installation

```
$ npm install express-flags
```

## Usage for a single request

```js
const expressFlags = require('express-flags')
const baseFlags = require('your-flags.json')

app.use()

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