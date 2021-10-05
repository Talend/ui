# SubHeaderBar component

This component display a container of action which is supposed to be alone. (one instance per page)

It provides a way to display a back button with an editable title.

## Props

| name | description | example
| -- | -- | -- |
| left | control actions to display on the left | [{ id: 'whatever', label: 'Foo' }] |
| center | control actions to display on the center | same |
| right | control actions to display on the right | same |
| rightActionsLoading | if true displays Skeleton instead of control actions at the right, to indicate loading | true/false |
| title | the title of the current document displayed just after the back button | 'Yes we can' |
| onGoBack | function called when the user click the back button | onClick(event) {} |
| className | add a className to the root header tag | 'my-css-class' |
| children | the children are displayed  just before center | <Action id="click-me" label="Run" /> |

## customization

The CustomInject support the props 'nowrap' usefull for some of the following accepted components keys:

* before-actionbar `nowrap`
* left
* before-back  `nowrap`
* before-title `nowrap`
* after-title `nowrap`
* center
* right
* after-actionbar `nowrap`

