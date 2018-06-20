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
| header | `string|object|Array|react element` | display the header |
| subheader | `string|object|Array|react element` | displayed after the header |
| drawers | `Array of <string|object|Array|react element>` | displayed in stacked drawers |
| one | `string|object|Array|react element` | displayed first colums in the TwoColumns layout |
| content | `string|object|Array|react element` | displayed the main content |
| footer | `string|object||Array|react element` | display the footer |
| getComponent | `function`| optional function to support non react element in header, subheader, ...|
