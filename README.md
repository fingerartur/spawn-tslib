# spawn-tslib
A handy utility to spawn a TS library ready to go.

All the annoying webpack, jest and tsconfig setup is done automatically for you, and you can go ahead and start developing your library today!

Simply create a new directory for you lib and inside run

```
npx @finga/spawn-tslib
```

*Your directory must be empty. The only thing it can contain is a .git index.*

## What gets set up for you
- Typescript and tsconfig.json
- Webpack configured to transpile to ES5
- Jest for unit testing
- Eslint with reasonable basic rules
- Installs dependencies via NPM

## Alternatives
If you are not fully satisfied with `@finga/spawn-tslib`, go and check out https://github.com/ryancat/create-typescript-library,
it is a good looking alternative with the same purpose and it is more configurable.
