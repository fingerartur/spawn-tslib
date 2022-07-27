# spawn-tslib
A handy utility to spawn a TS library ready to go.

All the annoying webpack, jest and tsconfig setup is done automatically for you, so you can go ahead and start developing your library now!

Simply run:

```
npx @finga/spawn-tslib my-lib
```

## What gets set up for you
- Typescript and tsconfig.json
- Webpack configured to transpile to ES5
- Jest for unit testing
- Eslint with reasonable basic rules
- Dependencies are installed via NPM

## Alternatives
If you are not fully satisfied with `@finga/spawn-tslib`, go ahead and check out https://github.com/ryancat/create-typescript-library

## Changelog

- Unreleased
  - Added more exclusion patterns for test files, to exclude them from compilation
  - Fixed ESlint config for test files and JS config files
- v1.0.0
  - Added `@finga/spawn-tslib` script that spawns a ready-for-action TS library project
