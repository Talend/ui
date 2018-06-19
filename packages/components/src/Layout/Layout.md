# Layout component

This component provide two common layouts to build your page

The structure is:

* header (optional)
* content (one or two coloums)
* footer (optional)

Props table:

This component use [Inject](../Inject/Inject.md).

| name | type | description |
| -- | -- | -- |
| mode | `string` | `OneColumn` (default) or `TwoColums` |
| header | `string|object|react element` | display the header |
| subheader | `string|object|react element` | displayed after the header |
| one | `string|object|react element` | displayed first colums in the TwoColumns layout |
| content | `string|object|react element` | displayed the main content |
| getComponent | `function`| optional function to get a component.|
| components | `object` | define slots to Inject some components |
| footer | `string|object|react element` | display the footer |

`components` props support the following slots are:

* `drawers` to fill the drawers
* `content` displayed in the content just before the children
