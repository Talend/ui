# Rework Talend scripts

## Context

It would be nide to add a new preset for node applications.
While creating it, it would be nice to rework a bit how script are handled.
We could avoid to pull all the dependencies for all the scripts, for instance we don't need storybook for node apps etc.

## Proposal

The proposal would be to split the scripts in different packages that don't rely on each others.
The index.js of talend-scripts would check the package.json and require the right package.

if the command is now known, it would fallback to required the package and execute the command like this

```
talend-scripts upgrade:deps
-> require ("@talend/upgrade-deps")()
```

### app-react-ng

build (webpack)
start (webpack)
start-storybook (storybook)
build-storybook (storybook)
test (jest + karma)
lint (eslint + stylelint)

### app-react

build (webpack)
start (webpack)
start-storybook (storybook)
build-storybook (storybook)
test (jest)
lint (eslint + stylelint)

### lib

build (tsc || babel)
start (storybook)
build-storybook (storybook)
test (jest)
lint (eslint + stylelint)

### node

build (tsc || babel)
start (ts-node-dev)
test (jest)
lint (eslint)

## Other scripts

- upgrade:deps : could be moved to a dedicated package (available via npx for instance)
- publish:local : could be moved to a dedicated package (available via npx for instance)
- extends : is it used ?
- postinstall : is it used ?
