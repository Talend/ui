# Sandbox

This app is aiming to help demonstrate `ui/container` containers in an environement where we can run a `cmf` app and mock a backend.

It can also be used as a development environment.
It is published to each PR on surge.

## How to use

#### Install

Install is done at the root of the mono repository but because we use the UMD we need to do

```
cd Talend/ui
yarn
yarn pre-release
cd packages/playground
yarn start
```

So then you can start the app

```
yarn start
```
