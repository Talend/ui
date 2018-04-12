# App Loader

This component is here to make http calls before the first render of the application. During the loading, it show the application's loader.

## Where i put it ?

On your top level component, you can place it this way :

```html
<AppLoader>
    <div>
        <ShortcutManager view="shortcuts" />
        <IconsProvider icons={mockIconDefinition} />
        <ACKDispatcher />
        <Notification />
        {props.children}
    </div>
</AppLoader>
```

## How to configure it ?

This is a sample of configuration :

```json
"AppLoader#default":{
    "saga": "appLoaderSaga",
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
* steps, you can pass objects, this objects can have an attribute ( exclusive ) :
  * actionCreators : an array of action creator to dispatch in parallel.
  * waitFor : an array of collection we have in the cmf store to go on next step
* hasCollections : an array of collections we have in the cmf store to render the children
