
Settings
==

Settings are your app configuration.
You configure the following things :
* the `actions`, which are the actions definitions
* the `props`, which are basically the props to pass to a `component`

## Load settings in CMF

There is a `settingsAction` utility module that, given the settings url, will fetch and dispatch the settings into CMF store.
The proper settings reducer will store them in `state.cmf.settings`.

```javascript
import { store as cmfstore, actions } from '@talend/react-cmf';
import appReducer from './reducers';

const store = cmfstore.initialize(appReducer);

const settingsAction = actions.settingsActions.fetchSettings('/settings.json');
store.dispatch(settingsAction);

```

## Actions

An action is a definition that **at least** holds the info to dispatch to the [store](store.md).

```json
{
  "actions": {
    "menu:datasets": {
      "id": "menu:datasets",
      "label": "Datasets",
      "icon": "talend-folder",
      "payload": {
        "type": "MENU_LINK",
        "cmf": {
          "routerReplace": "/datasets"
        }
      }
    },
    "datasets:fetchAll": {
      "id": "datasets:fetchAll",
      "actionCreator": "fetchAll"
    }
  }
}
```

The actions settings are a dictionary.
It should follow some rules:
* the dictionary key is the action `id` property
* the action has either a `payload` or an `actionCreator` property

The `payload` property defines static properties to dispatch to the store

The `actionCreator` property defines the registered `action creator` id to call and dispatch.

## Props

Props will be applied to a `registered component`.

```json
{
  "props": {
    "datasets": {
      "didMountActionCreator": "dataset:fetchAll",
      "header": { "_ref": "AppHeaderBar#default" },
      "list": {
        "collectionId": "datasets",
        "list": {
          "columns": [
            { "key": "id", "label": "ID" },
            { "key": "label", "label": "Name" },
            { "key": "created",  "label": "Created" },
            { "key": "tags", "label": "Tags" }
          ]
        }
      }
    }
  },
  "ref": {
    "AppHeaderBar#default": {
      "app": "CMF starter"
    }
  }
}
```

The props settings are a dictionary.
It should follow some rules:
* `actions` are references to an action setting id (ex : `"didMountActionCreator": "dataset:fetchAll"` where `dataset:fetchAll` is an action id)
* it can have references to common settings parts (ex: `"header": { "_ref": "AppHeaderBar#default" }` where `AppHeaderBar#default` is a definition from `ref` part). CMF will replace the refs by the actual definitions.

Note that you can use expression here if the component is cmfConnected.
