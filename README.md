# serverless-recap

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

## Basics

We use `npm` as our build tool. `grunt`, `gulp` or other build tools are not required, `npm` is a perfectly good build tool

### Running your function locally

```
npm start
```

This works best when you make your Lambda function available via a HTTP endpoint, as it will be hosted on port 3000 and you can then invoke it by accessing that endpoint.

Exposing your function via HTTP is also useful in order to be able to manually invoke it, even when it is normally invoked via a schedule, an S3 event or otherwise

### Executing unit tests

```
npm test
```

Tests should be implemented inside the `test` folder using an appropriate structure which matches the main source

Tests should be written using the [Mocha framework](https://mochajs.org/), unless an alternative framework is required.

Additional testing libraries have been included in the repository to aid with assertions ([Chai](http://chaijs.com/)), mocking ([Sinon](http://sinonjs.org/)) and testing of Promise related APIs

## Enforcing code style

Code style is enforced by ESLint

```
npm run lint
```

## Using serverless

Serverless's documentation suggests installing it globally, however we provide it as a development dependency, so this is not required

Instead of running Serverless by invoking `servlerless` or `sls` (which can be done when installed globally), you should instead invoke it by prefixing these commands with `npm run`, i.e. `npm run serverless` or `npm run sls`

To execute specific serverless commands, you'll need to declare the arguments correctly for npm scripts. This means calling `npm run serverless -- <arguments>`, e.g:

```
npm run serverless -- logs --function hello
```

See [Serverless](https://github.com/serverless/serverless) for details
