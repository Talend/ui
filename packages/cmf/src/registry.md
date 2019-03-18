# The registry

You will find the registry as the central piece of CMF to make Dependency Injection possible.
It's just a key/object registry and it's used with prefix to store the following kind of entities:

* action creators (function)
* components (function or class)
* expressions (function)
* saga (iterator)

The registry is filled during the cmf.bootstrap call. So we can rely on it
to identify code in the configuration.

It's available in bootstrap options under `registry` key.
