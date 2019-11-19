# SortBy component

## Description
This component is used to sort the items in the collection.
It can work in a controlled or uncontrolled mode. It is considered to be working in controlled mode if the `onChange` prop is provided; meaning that if it is the case, it will try to call `onOrderChange` too.

## Props

| Name              | Type                                      | Required | Default value  | Description                                                                                                             |
| ----------------- | ----------------------------------------- | -------- | -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| id                | String                                    |          | (Generated ID) |                                                                                                                         |
| options           | Array({ key: String, lavel: String })     | Yes      |                | Array of available options (with `label` and `key` informations)                                                        |
| initialValue      | { sortBy: String, isDescending: Boolean } |          |                | Initial sorting criteria                      (uncontrolled mode)                                                       |
| onChange          | Function                                  |          |                | Triggered when the sort criteria is changed   (controlled mode)                                                         |
| value             | { sortBy: String, isDescending: Boolean } |          |                | Selected sort criteria                        (controlled mode)                                                         |
