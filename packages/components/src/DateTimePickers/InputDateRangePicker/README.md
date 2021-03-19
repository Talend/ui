# Date Range Picker
This is a date range picker for selecting a period, composed by 2 date pickers as start date and end date.

## props
| name | type | description |
|------|------|-------------|
| startDate | `Date`, or `number` (timestamp) or `string` in the specified format (defined by props.dateFormat) | initial start date |
| endDate | `Date`, a `number` (timestamp) or `string` in the specified format (defined by props.dateFormat) | initial end date |
| onChange  | function | Trigger when date or error change (event, errorMessage, date)<br/>- Return the event object with <br/>`startDate`/`endDate`: date selected,<br/>`origin`: can be `START_PICKER` or `END_PICKER`, you can use this to distinguish if there's change on start date or end date,<br/>`errors`: contains the error code and message. empty if range is valid |
| onBlur    | function | Trigger when the component loose focus (outside the picker AND the input) from either start date or end date|
| display | string | Default value is undefined. If set to `inline`, it will display range picker in a inline mode which the labels and inputs are in one line |

`dateFormat` and `useSeconds` set on InputDateRangePicker will be passed to individual InputDatePicker and still take effect.


