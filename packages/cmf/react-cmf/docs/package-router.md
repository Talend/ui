---
id: package-router
title: Integration of react-router
sidebar_label: react-router
---


[react-router](https://github.com/ReactTraining/react-router) is integrated as an external addons.

## Getting started

Do the following in your app bootstrap:

```javascript
import cmf from '@talend/react-cmf';
import getRouter from '@talend/react-cmf-router';

const router = getRouter({
    // cf options
});

cmf.bootstrap({
    modules: [router.cmfModule],
    RootComponent: router.RootComponent,
});
```

Then your app support the `routes` in the settings.

## extra features

react-router is nice, we just add the following features to let you use cmf core features.

* The head's title of your webapp can be set from your routes configuration
* A saga can be spawn and cancel per routes
* `componentId` props is spread to the injected component so you can configure it

Please read the provided [Readme](https://github.com/Talend/ui/tree/master/packages/router/README.md) for this addon to know more.
