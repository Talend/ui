---
layout: page
title: "What is CMF ?"
category: home
date: 2017-02-28 10:09:02
order: 1
---

CMF stands for Content Management Framework. It helps you build an application in React with a system to configure your contents and much more.

It combines
* [Redux](http://redux.js.org/) to manage app state
* [React Router](https://github.com/ReactTraining/react-router) to manage your routes

Based on a `component / action creator` registry and a `settings` format, you configure your entire app
* the routes
* what component to load on a route
* what props to pass to this component to load
* what action is dispatched

## The core concepts 
* [Store]({{ site.baseurl }}{% link _posts/2017-02-28-core-store.md %}) : CMF is coupled to `redux` to manage your app state with internal CMF state
* [Registry]({{ site.baseurl }}{% link _posts/2017-02-28-core-registry.md %}) : CMF has a registry where you can set `components` and `action creators`
* [Settings]({{ site.baseurl }}{% link _posts/2017-02-28-core-settings.md %}) : this is used to configure your app content, customising the `routes` (url, components), `views` and static `actions`.

## How CMF works

*Registry*
* Register your `components` with unique names.
* Register your `action creators` with unique names.

*Settings*
* Settings > routes map `urls` to registered `components` names and `views` settings names.
* Settings > views contains the `components` props and can refers to `actions` settings names.
* Settings > actions contains either static actions definition or can refers to registered `action creators` names.

*Bootstrap and runtime*
* Bootstrap your app with the provided `<App />` component
* CMF instantiate the right component on a requested route, injecting the props

## Extra features
CMF comes with handy features
* Error redux `middleware` [Doc]({{ site.baseurl }}{% link _posts/2017-02-28-middleware-error-logging.md %}).
* HTTP operations `actions` and redux `middleware` [Doc]({{ site.baseurl }}{% link _posts/2017-02-28-middleware-http.md %}).
* CMF internal `middleware` [Doc]({{ site.baseurl }}{% link _posts/2017-02-28-middleware-cmf.md %}).
* Actions utility to get and configure easily the `action creators` [Doc]({{ site.baseurl }}{% link _posts/2017-02-28-api-action.md %}). 