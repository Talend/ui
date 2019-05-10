# SortBy component

## Description
This component is used to sort the items in the collection.
It can work in a controlled or uncontrolled mode. It is considered to be working in controlled mode if the `onChange` prop is provided ; meaning that if it is the case, it will try to call `onOrderChange` too.

## Props

| Name              | Type     | Required | Default value | Description                                                                                                             |
| ----------------- | -------- | -------- | ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| options           | Array    | Yes      |               | Array of available options (with `label` and `key` informations                                                         |
| id                | String   |          | (Generated ID)|                                                                                                                         |
| selected          | String   |          |               | Selected sort option criteria                                                                                           |
| isDescending      | Boolean  |          |               | Wether if the sort is descending or ascending                                                                           |
| onChange          | Function |          |               | Triggered when the sort criteria is changed (controlled mode)                                                           |
| onOrderChange     | Function |          |               | Triggered when the sort direction is changed                                                                            |
| initialSortParams | Object   |          | {}            | Initial sorting parameters, if we want to provide an initial state but keep the component behaving in uncontrolled mode |
	