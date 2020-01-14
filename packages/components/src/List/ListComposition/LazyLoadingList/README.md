# LazyLoadingList component

## Description

List component that handles unloaded data and loading callback.

## Props

| Name             | Type     | Required | Default value | Description                                              |
| ---------------- | -------- | -------- | ------------- | -------------------------------------------------------- |
| loadMoreRows     | Function |   Yes    |               | Triggered when the user scrolls and rows data is missing |
| rowCount         | Number   |          |               | Total number of rows (in the whole dataset)              |
| threshold        | Number   |          | 5             | When data is fetched (see `<InfiniteLoader />`)          |
| minimumBatchSize | Number   |          | 20            | Fetch batch size (see `<InfiniteLoader />`)              |
| ... rest         |   N/A    |   N/A    |      N/A      | Rest of the props forwarded to `<VirtualizedList />`     |
