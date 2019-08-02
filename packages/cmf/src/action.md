## Deprecated

The entier module 'action' is depreacted. The only part not deprecated is actionCreator.
It still exists for compatibility reasons but you should move to use simple "props" from CMF.
Action is not anymore a concept in CMF, just use props on top of your components.

So this means all theses call should be refactor to let the component take it's on props:

* mapDispatchToProps
* getOnProps
* getActionObject
* getActionInfo
* getActionsById

## getActionCreatorFunction
```javascript
import cmf from 'react-cmf';

cmf.actionCreator.get(context, id);
```

| Argument | Type | Description | Mandatory |
|---|---|---|---|
| context | object | The CMF react context (injected by CMF connector). See [how to connect a container to CMF]({{ site.baseurl }}{% link _posts/2017-02-28-how-to-connect-a-container-to-cmf-.md %}) | true |
| id | string | The action creator identifier | true |

It returns the registered `action creator` from the provided registry.

## registerActionCreator

```javascript
import cmf from 'react-cmf';

cmf.actionCreator.register(id, actionCreator);
```

| Argument | Type | Description | Mandatory |
|---|---|---|---|
| id | string | The action creator identifier | true |
| actionCreator | function | The action creator to register | true |

