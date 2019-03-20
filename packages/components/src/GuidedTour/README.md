# Guided Tour Component

## Dependency

The guided tour is based on [reactour](https://github.com/elrumordelaluz/reactour).

## Props

| Props | Type | Description |
| ----- | ---- | ----------- |
| className | string | CSS classes for guided tour component |
| steps | array of object or function |
| isOpen | boolean | If true, guided tour will start |
| onRequestClose | function | Callback, to toggle isOpen |
| disableAllInteractions | boolean | If true, all controls will disappear |

## Style

| CSS class | Type | Description |
| --------- | ---- | ----------- |
| `.react-tour` | Block | The guided tour |
| `.react-tour__mask` | Element | The dark overlay |
| `.react-tour__highlighted-mask` | Element | The light overlay to highlight element |
| `.react-tour__header` | Element | The header of the tooltip |
| `.react-tour__body` | Element | The body of the tooltip |
| `.react-tour--no-interaction` | Modifier | The guided tour without any controls |
