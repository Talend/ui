---
layout: page
title: "Action api"
category: api
date: 2017-02-28 22:10:38
order: 3
---

## getActionsById
```javascript
import { api } from 'react-cmf';

api.action.getActionsById(context);
```

| Argument | Type | Description | Mandatory |
|---|---|---|---|
| context | object | The CMF react context (injected by CMF connector). See [how to connect a container to CMF]({{ site.baseurl }}{% link _posts/2017-02-28-how-to-connect-a-container-to-cmf-.md %}) | true |

It returns the `static actions definitions dictionary` from the [settings]({{ site.baseurl }}{% link _posts/2017-02-28-core-settings.md %}).

## getActionCreatorFunction
```javascript
import { api } from 'react-cmf';

api.actionCreator.get(context, id);
```

| Argument | Type | Description | Mandatory |
|---|---|---|---|
| context | object | The CMF react context (injected by CMF connector). See [how to connect a container to CMF]({{ site.baseurl }}{% link _posts/2017-02-28-how-to-connect-a-container-to-cmf-.md %}) | true |
| id | string | The action creator identifier | true |

It returns the registered `action creator` from the provided registry.

## getActionInfo
```javascript
import { api } from 'react-cmf';

api.action.getActionInfo(context, id);
```

| Argument | Type | Description | Mandatory |
|---|---|---|---|
| context | object | The CMF react context (injected by CMF connector). See [how to connect a container to CMF]({{ site.baseurl }}{% link _posts/2017-02-28-how-to-connect-a-container-to-cmf-.md %}) | true |
| id | string | The action identifier | true |

It returns the static `action` definition from the settings.

## getActionObject
```javascript
import { api } from 'react-cmf';

api.action.getActionObject(context, id, event, data);
```

| Argument | Type | Description | Mandatory |
|---|---|---|---|
| context | object | The CMF react context (injected by CMF connector). See [how to connect a container to CMF]({{ site.baseurl }}{% link _posts/2017-02-28-how-to-connect-a-container-to-cmf-.md %}) | true |
| id | string | The action identifier | true |
| event | object | The user event to dispatch | false |
| data | object | The user data to dispatch | false |

It creates the action to dispatch from
* the `action` static definition from settings (its payload)
* the result of the `action creator` if action.actionCreator refers to a registered action creator.
* the provided user `event`
* the provided user `data`

## getOnProps
```javascript
import { api } from 'react-cmf';

api.action.getOnProps(props);
```

| Argument | Type | Description | Mandatory |
|---|---|---|---|
| props | object | Component props | true |

It returns the array of props keys beginning with `on`. This is used to get the list of action props (onClick, onKeyDown, ...).

## mapDispatchToProps
```javascript
import { api } from 'react-cmf';

api.action.mapDispatchToProps(dispatch, props);
```

| Argument | Type | Description | Mandatory |
|---|---|---|---|
| dispatch | function | Store dispatch function | true |
| props | object | Component props | true |

It returns the props with the actions props replaced by their dispatch closures.

## registerActionCreator

```javascript
import { api } from 'react-cmf';
const registerActionCreator = api.actionCreator.register;

registerActionCreator(id, actionCreator);
```

| Argument | Type | Description | Mandatory |
|---|---|---|---|
| id | string | The action creator identifier | true |
| actionCreator | function | The action creator to register | true |
