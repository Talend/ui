# A set of best pratices for react-cmf

## Alway put a displayName to your component

The `displayName` is used by CMF for two things:

* auto load it's props in the settings (without the use of the props.view)
* build the state in state.cmf.components if your provide a defaultState in `cmfConnect``

This also may help you to debug in production.

## Do not use mapDispatchToProps

To send action in redux you have already two props:

* `this.props.dispatch(actionWithType)`
* `this.props.dispatchActionCreator('actionCreatorName', [event], [data], [context])`

both are interesting and make the code more easy to understand than your own props

We will remove it from cmfConnect API.

## Send as few actions as possible

Redux console can be really hard to read and to track what happens.
Each time you send an action, all reducers and middlewares are called.

For example the `api.actions.http` action creator of CMF can send multiple
actions at every stage of an http request.
So add the onSend only if you need it.

## Good action TYPE

Using saga it's pretty easy to make your TYPE meaning full

One good approch is to identify the button more than the action achived:

* 'CLICK_CANCEL_MODAL_ADD_STUFF' good
* 'CLOSE_MODAL_ADD_STUFF' bad
* 'DIDMOUNT_MODAL_ADD_STUFF' good
* 'FETCH_STUFF' bad

So our recommandation goes to `${EVENT}_${COMPONENT_SOURCE_ID}`

Because the what it does may change or have multiple side effect and it depends
of the context.
One component can be added in multiple context so the best is to set it's action type this way


## Use redux-saga and sagaRouter

fetch is really easy to use but can't be canceled and it may have lot's of effect you don't want.
A user may change screen fast, or a request can be really slow.

So redux-saga is a really well tool to help you write async code that can be cancelled.
