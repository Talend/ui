# Internals: The registry

You will find the registry as the central piece of CMF.
It's just a key/object registry and it's used with prefix to store the following:

* action creators (function)
* components (function or class)
* expressions (function)
* saga (iterator)

The registry is filled during the app.js bootstrap phase. So we can rely on it
to identify code in the configuration.

By convention you can use a `configuration.js` file to register all your stuff;
