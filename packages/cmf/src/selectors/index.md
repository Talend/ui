# api.selectors

A selector take the state and return part of it.
This api propose some selectors

## [api.selectors.collections](./collections.md)

## api.selectors.router

`getLocation` return the current [location object](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/location.md) which is persisted from `history` into redux store

`getPath` return the current path (a string) which is the fragment so you can apply matchPath to it.

## [api.selectors.toJS](./toJS.md)
