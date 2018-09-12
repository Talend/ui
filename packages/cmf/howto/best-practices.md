# Best practices for react-cmf

## Define displayName

Always put a `displayName` to your components for two things:

* auto load its props in the settings (without the use of the props.view)
* build the state in `state.cmf.components` if your provide a `defaultState` in `cmfConnect`

It also may help you to debug in production.

## Avoid mapDispatchToProps

To send actions in redux, you already have two props:

* `this.props.dispatch(actionWithType)`
* `this.props.dispatchActionCreator('actionCreatorName', [event], [data], [context])`

both are interesting and make the code more easy to understand than your own props

We will remove it from `cmfConnect` API.

## Limit actions

Redux console can be really hard to read and to track what happens.
Each time you send an action, all reducers and middlewares are called.

For example the `cmf.actions.http` action creator of CMF can send multiple
actions at every stage of an http request.
So add the `onSend` only if you need it.

## Choose wisely action TYPE

Using saga, it's pretty easy to make your TYPE be meaningful.

One good approch is to identify the button more than the action achieved:

* 'CLICK_CANCEL_MODAL_ADD_STUFF' good
* 'CLOSE_MODAL_ADD_STUFF' bad
* 'DIDMOUNT_MODAL_ADD_STUFF' good
* 'FETCH_STUFF' bad

So our recommendation goes to `${EVENT}_${COMPONENT_SOURCE_ID}`

Because what it does may change (or have multiple side effects) depending
of the context.
One component can be added in multiple contexts so the best is to set its action type this way.


## Use redux-saga and sagaRouter

`fetch` is really easy to use but can not be canceled.
It may have a lot of effects you don't want.
A user may change screen fast, or a request can be really slow.

So `redux-saga` is a really well tool to help you write async code that can be cancelled.
