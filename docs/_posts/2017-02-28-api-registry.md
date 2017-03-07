---
layout: page
title: "Registry api"
category: api
date: 2017-02-28 22:10:34
order: 1
---

The registry exposes a simple api to add and get elements.
In a common use of CMF, you won't have to manipulate the registry with this api, but through utility services. 

## addToRegistry
```javascript
import { api } from 'react-cmf';

api.registry.addToRegistry(id, item);
```

| Argument | Type | Description | Mandatory |
|---|---|---|---|
| id | string | A unique identifier for your item | true |
| item | any | Any object you want to store under the id | true |

## getRegistry
```javascript
import { api } from 'react-cmf';

const registry = api.registry.getRegistry();
```

It returns the map of id/item.

## getFromRegistry
```javascript
import { api } from 'react-cmf';

const item = api.registry.getFromRegistry(id);
```

| Argument | Type | Description | Mandatory |
|---|---|---|---|
| id | string | The unique identifier for your item | true |

It returns the item stored under the provided id.

## lock
```javascript
import { api } from 'react-cmf';

api.registry.lock();
```

It locks your registry. Any attempt to add items in a locked registry will throw an error.
This is particularly useful to avoid configuration modification after the app configuration step.
