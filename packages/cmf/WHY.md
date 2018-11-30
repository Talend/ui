
# Why CMF

First we want to get back on the history. When we have vote to use react and we have start some projects we have list the following needs:

* common patterns
* easy to debug
* best libraries from the outside
* as few libraries as possible
* share experience
* add guidelines

The main idea is any new developper should follow the same way to build an app what ever the app is at talend.
So it makes it more easy to move from a team to another.

Then comes the constraints:

* must be easy to create different versions of the same product (enterprise, free, oss, ...)
* create sub app to share complete screens between apps

So we comes with the following pattern in mind: [IoC](https://en.wikipedia.org/wiki/Inversion_of_control) and [DI](https://en.wikipedia.org/wiki/Dependency_injection).

But CMF is also a set of libs integrated together:

* redux
* immutablejs
* redux-saga

So now let s try to details each items.

## Why DI

DI make your app less wired. To understand that we need also to understand import.
Import is a static wire between to files. It creates a dependency.
When the dependency are locals it s ok but when it comes from external addons it becomes more hard to maintain.

DI is very nice to create multiple versions of the same product. Without changing code of the original app you can
change implementation of a given component.

If you take angularjs (the one) for example it s all about that.
The app configure all the service, then you just said you want the service by an id (string) and angularjs will inject it
for you.

## Why IoC

The idea here is your app is not one app. It s a set of components + some business code.
We want the backend to serve an configuration that will setup your app. So the backend may add or remove some part of it.

So reading the app code doesn t tell you which component will be renderered.
CMF take the settings, setup the router using the settings, then the router render the given component as children of the App.

## Why Redux

Please read: https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367

## Why Immutable

By Lee Byron [this video](https://www.youtube.com/watch?v=oTcDmnAXZ4E) explain why immutability is great.
But it adds API and weight to the bundle.
Most of complains we have is about API and `toJS` issue in mapStateToProps which need memoization.

I would really like to move it outside of CMF so we can at the app level choose what should be used.
There are multiple libraries to get immutable data structure.

Without immutable datastructure, first it s hard to know if data has changed. So react may not re-render a component
because the props has not changed, you have just mute it.

## Why props.state and props.setState?

We want all the state of all components to be in redux.

To shift all component state we need a simple api. Without any core API you have to write `at the app level`:

* an action to dispatch
* a reducer to write down in the global state
* a selector to make it easy read the info without knowing where it is

It would make the app code base grow very fast if for every components you write that.

Next a react dev know very well state and setState API. Why not doing exactly the same API ?

Under the hood this API provided by CMF is just one action, one reducer and one selector.

The only things I regret about this API is it force you to use immutable js. And about this we have the following ticket:
[TUI-266](https://jira.talendforge.org/browse/TUI-266) make immutablejs an option in CMF

