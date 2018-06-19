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
| mode | string | `OneColumn` (default) or `TwoColums` |
| header | `injectable` | display the header |
| getComponent | `function`| optional function to get a component.|
| components | `object` | define slots to Inject some components |
| footer | `injectable` | display the footer |

`components` props support the following slots are:

* drawers
* after-header
* after-subheader
* after-content
