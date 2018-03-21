Console
==

Simple wrapper for browser `console`.

Accepted methods are:
* `trace`
* `debug`
* `log`
* `info`
* `warn`
* `error`

if `process.env.NODE_ENV` is set to `PRODUCTION`, then there is no output for others methods than `warn` and `error`.
