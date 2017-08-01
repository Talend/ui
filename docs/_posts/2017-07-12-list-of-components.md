---
layout: page
title: "List of components"
category: home
date: 2017-07-12 10:09:02
order: 1
---

CMF provide a registry that let you put whatever you want inside.
It also provide components to use this registry without knowing who it works:

## App

This component let you start your app with all internals needed:

* react-redux's Provider
* react-cmf RegistryProvider
* react-cmf router which is on top of react-router

## RegistryProvider

This component inject the registry as a context.
You are not supposed to use it directly.

## Dispatcher

This component let you dispatch register action on any event handled by React

```
<a
	xlinkHref="#"
	onClick={preventDefault}
	className="svg-anchor"
>
	<Dispatcher onClick="myAction">
		{children}
	</Dispatcher>
</a>
```

## Inject

This component let you use any registred component without import it in your code.
This make specific versions of front easy to build:

```
<Inject component="MyComponent" extra-props-supported />
```
