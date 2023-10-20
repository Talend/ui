---
'@talend/scripts-core': major
'@talend/scripts-config-jest': major
---

- fix: enforce timer at the end of all tests.
- feat: mock ally.js has it uses unsupported dom method from jsdom.
- feat: add jest-axe configuration


To support floating-ui/react following issue we have decided to add an afterAll to let floating-ui finish stuff
https://github.com/floating-ui/floating-ui/issues/1908


Breaking changes:

you may have tests where you ask for jest.useFakeTimer without go back to real at some point. This is a side effect and it is not compatible with our change to support floating-ui.

```diff
jest.useFakeTimers()
render(<Tooltip><button></Tooltip>)
+jest.useRealTimers()
```

This will fix an error said your test is still pending after 5000 ms.

