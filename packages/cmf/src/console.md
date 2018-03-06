Console
==

Simple wrapper for Browser `console`.

Accepted methods are:
* `trace`
* `debug`
* `log`
* `info`
* `warn`
* `error`

if `process.env` is `PRODUCTION`, there is no output for others levels than `warn` and `error` by default.
