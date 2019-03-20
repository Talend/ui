# Guided Tour Component

## Dependency

The guided tour is based on [reactour](https://github.com/elrumordelaluz/reactour).

## Props

| Props | Type | Description |
| ----- | ---- | ----------- |
| `className` | string | CSS classes for guided tour component |
| `steps` | array of object or function | Array of steps to construct the guided tour |
| `isOpen` | boolean | If true, guided tour will start |
| `onRequestClose` | function | Callback when user close i.e. to toggle `isOpen` |
| `disableAllInteractions` | boolean | If true, all controls will disappear |

## Style

Those classes are accessible from outside.

| CSS class | Type | Description |
| --------- | ---- | ----------- |
| `.react-tour` | block | The guided tour |
| `.react-tour__mask` | element | The dark overlay |
| `.react-tour__highlighted-mask` | element | The light overlay to highlight element |
| `.react-tour__header` | element | The header of the tooltip |
| `.react-tour__body` | element | The body of the tooltip |
| `.react-tour--no-interaction` | modifier | The guided tour without any controls |
