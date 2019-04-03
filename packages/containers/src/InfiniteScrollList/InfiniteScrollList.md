# InfiniteScrollList container

This is a first version of this container.
For the moment, it only supports only loading data as the user scrolls down the list.

## Props

| Name             | Type     | Required | Default value | Description                                              |
| ---------------- | -------- | -------- | ------------- | -------------------------------------------------------- |
| items            | Array    |          |               | List of items to show                                    |
| totalRowCount    | Number   |          |               | Total number of rows (!= items length)                   |
| columns          | Array    | Yes      |               | Columns definition                                       |
| threshold        | Number   |          | 5             | When data is fetched (see `<InfiniteLoader />`)          |
| minimumBatchSize | Number   |          | 20            | Fetch batch size (see `<InfiniteLoader />`)              |
| onLoadMoreRows   | Function |          |               | Triggered when the user scrolls and rows data is missing |

## TODO
- Start with a scroll offset
- Handle column sorting
- Unit tests
- Pretty README.md
