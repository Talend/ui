# SubHeaderBar container

This container expose the same API as the component.
So if you don't know it please [read this one first](../../../components/src/SubHeaderBar/SubHeaderBar.md).

Note the props editMode is managed by it's cmf state available at

```javascript
state.cmf.components.getIn(['Container(SubHeaderBar)', 'default', 'editMode']);
```

## Props

It add the [cmf's props support](../../../cmf/src/cmfConnect.md) because it's connected with a state

| name | description | example |
| -- | -- | -- |
| actionCreatorChange | a string to identify an action creator | 'my-action-creator' |
| actionCreatorGoBack | a string to identify an action creator triggered if the user click on `go back` button | |
| actionCreatorEdit | a string to identify an action creator triggered when the user click on the edit button of the title | |
| actionCreatorSubmit | a string to identify an action creator triggered when the user submit the edit form of the title | |
| actionCreatorCancel | a string to identify an action creator triggered when the user click on the cancel of the edit form | |

