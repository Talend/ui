# Records viewer

## Concept

This is based on the generic viewer and react-virtualized.  
You can see the customisation [here](./genericViewer.configuration.js). Comments explain things.

## Accessibility

Alternative text have been provided in non text elements. Example : `Open menu` on the menu button.

## TODO

* just a warning, no other solution : when highlighted array change, it rerender every node of each records, testing its jsonpath through the highlighted regex. `react-virtualized` limits this, because a limited subset of records are rendered.
