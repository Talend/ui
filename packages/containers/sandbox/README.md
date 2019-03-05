# Sandbox

This app is aiming to help demonstrate `ui/container` containers in an environement where we can run a `cmf` app and mock a backend.

It can also be used as a development environment.

## How to use

#### Install
```
yarn
```

#### Start the app
```
yarn start
```

you can also build it to then start the dist with the mock:

```
yarn start-dist [--gzip]
```

### Add your container
Here's how to add your own container to the app :
- Ensure your container is registred by _src/app/index.js_.
- Add it to the list of bootstrapped component by CMF in this same file.
	```
	import ComponentForm from '@talend/react-containers/lib/ComponentForm'
	cmf.bootstrap({
		components: Object.assign({}, components, { ComponentForm }),
		...
	});
	```
- Add the route and configure it within CMF's configuration file in src/assets/settings.json. Your component should be available with the injected props and at the route you've described in the configuration.

### Add your mock backend

A mock server is available under `mockBackend`. It is started when you start the app.
It simply responds to GET HTTP requests with a JSON file's content according to the request's path.

Example :

#### Query
```
http://localhost:3000/api/mock/foo/bar
```
#### Response
```
Content from the JSON file under mockBackend/mock/foo/bar.json
```
