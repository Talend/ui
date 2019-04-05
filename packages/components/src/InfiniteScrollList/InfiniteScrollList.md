# InfiniteScrollList container

## Description

List component that loads its items as the user scrolls it's content.
Unloaded rows are shown with a Skeleton per column until data is available.

It supports sorting (controlled mode) by providing the _onSort_ (callback) and `sortBy` / `sortDirection` props.
When the user chooses a sorting field, the list scrolls back up to the top.

## Props

| Name             | Type     | Required | Default value | Description                                              |
| ---------------- | -------- | -------- | ------------- | -------------------------------------------------------- |
| columns          | Array    | Yes      |               | Columns definition                                       |
| items            | Array    |          |               | List of items to show                                    |
| rowCount         | Number   |          |               | Total number of rows (!= items length)                   |
| threshold        | Number   |          | 5             | When data is fetched (see `<InfiniteLoader />`)          |
| minimumBatchSize | Number   |          | 20            | Fetch batch size (see `<InfiniteLoader />`)              |
| onLoadMoreRows   | Function |          |               | Triggered when the user scrolls and rows data is missing |
| onSort           | Function |          |               | Triggered when the user sorts with a given column        |
| sortBy           | Function |          |               | Object/column key used to sort                           |
| sortDirection    | Function |          |               | Sort direction, `ASC`/`DESC`(ending)                     |
| ...rest          |   N/A    |    N/A   |      N/A      | Rest of the props forwarded to the list component        |
