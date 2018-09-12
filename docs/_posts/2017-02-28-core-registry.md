---
layout: page
title: "Registry"
category: core
date: 2017-02-28 10:13:01
order: 2
---

The registry is a simple singleton that can store anything under a string key.
It is used internally to register `route components` and store `action creators`.

For more info, take a look at the complete [api]({{ site.baseurl }}{% link _posts/2017-02-28-api-registry.md %}).

## Register a component

Components registration should be done via the CMF [route api]({{ site.baseurl }}{% link _posts/2017-02-28-api-route.md %}).

```javascript
const registerComponent = api.component.register;

...

registerComponent('App', App);
```

## Register an action creator

Action creator registration should be done via the CMF [action api]({{ site.baseurl }}{% link _posts/2017-02-28-api-action.md %}).

```javascript
const registerActionCreator = api.actionCreator.register;

...

registerActionCreator('dataset:fetchAll', fetchDataSets);
```