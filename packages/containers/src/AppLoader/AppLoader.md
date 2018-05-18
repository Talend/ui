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

you could also provide configuration to be to use the inject placeholders to inject all the stuff

## How to configure it ?

This is a sample of configuration :

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
    "steps":[
        { "actionCreators":["user:fetchIdentity"] },
        { "waitFor":["identity"] },
        { "actionCreators":["datastore:fetch.types", "datastore:fetch:cloudAgents"]}
        { "waitFor":["datastore-types", "cloud-agents"] },
        { "actionCreators":["datastore:fetchAll", "dataset:fetchAll"] }
    ],
    "hasCollections": ["identity", "datastore-types", "datastores", "datasets"]
},
```

### Props

* saga : required cause this is how the action creator are dispatched
* components : injected components
* steps, you can pass objects, this objects can have an attribute ( exclusive ) :
  * actionCreators : an array of action creators to dispatch in parallel.
  * waitFor : an array of collection ids to have in cmf store before we can trigger the next step
* hasCollections : an array of collection ids to have in cmf store before it can render the children
