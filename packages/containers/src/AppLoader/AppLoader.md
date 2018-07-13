# App Loader

This component is here to make http calls before the first render of the application. During the loading, it show the application's loader.

## Where do i put it ?

On your top level component, you can place it this way :

```html
<AppLoader>
    <IconsProvider icons={mockIconDefinition} />
    <ACKDispatcher />
    {props.children}
</AppLoader>
```

You can also provide configuration to use the inject placeholders to inject all the stuff (see next section).

## How to configure it ?

This is a sample of configuration :

```json
"AppLoader#default":{
    "saga": "appLoaderSaga",
    "steps":[
        { "sagas":["user:fetchIdentity"] },
        { "waitFor":["identity"] },
        { "takeAction": ["SOME_ACTION_TYPE"] },
        { "actionCreators":["datastore:fetch.types", "datastore:fetch:cloudAgents"]}
        { "waitFor":["datastore-types", "cloud-agents"] },
        { "actionCreators":["datastore:fetchAll", "dataset:fetchAll"] }
    ],
    "hasCollections": ["identity", "datastore-types", "datastores", "datasets"]
},
```

To use the inject feature to add component within the children, you have 2 placeholders

- before-children
- after-children

This is a sample of inject configuration :

```json
"AppLoader#default":{
    "saga": "appLoaderSaga",
    "components": {
        "before-children": [
          {
            "component": "Notification"
          },
          {
            "component": "ShortcutManager",
            "view": "shortcuts"
          }
        ]
    },
    "steps": [...],
    "hasCollections": [...]
}
```

### Props

- saga : required cause this is how the action creator are dispatched
- components : injected components
- steps, you can pass objects, this objects can have an attribute ( exclusive ) :
  - sagas : an array of sagas to launch ( registered in the registry )
  - actionCreators : an array of action creators to dispatch in parallel.
  - takeAction : an array of actions we want to wait to be dispatched
  - waitFor : an array of collection ids to have in cmf store before we can trigger the next step
  - hasCollections : an array of collection ids to have in cmf store before it can render the children
