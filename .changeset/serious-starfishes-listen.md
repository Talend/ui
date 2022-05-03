---
'@talend/react-cmf-router': major
---

Upgrade to react-router v6

## Migration (dependencies)

- Update your package.json to point to `"@talend/react-cmf-router": "^4.0.0"`.
- Execute yarn install and yarn-deduplicate.
- yarn list --pattern router should not list `react-router-redux` anymore and all dependencies listed should be flat.

# Breaking changes (code)

`onEnter` and `onLeave` hooks are not supported anymore. You can use `React.useEffect` but be carefull as onEnter should be finished before rendering happens so use also a state for that.

- sagaRouter is deprecated but still works. You can use either
  - use Saga component from `@talend/react-cmf` (prefered way)
  - `saga` props on a cmfConnected component
  - dispatch `cmf.actions.saga.start({saga: 'nameOfRegistredSaga'})` action creator
  
