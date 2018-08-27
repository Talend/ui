# InputDateTimePicker

This widget surprisingly allows you to render an InputDateTimePicker.

## Json Schema

| Property | Description                                               |
| -------- | --------------------------------------------------------- |
| type     | `string` or `number`                                      |
| format   | `iso-datetime` (string type) or `timestamp` (number type) |

```json
{
	"type": "object",
	"title": "Channel",
	"properties": {
		"endDate": {
			"type": "string",
			"format": "iso-datetime"
		}
	}
}
```

```json
{
	"type": "object",
	"title": "Channel",
	"properties": {
		"endDate": {
			"type": "number",
			"format": "timestamp"
		}
	}
}
```

## UI Schema

| Property    | Description                                                    | Default |
| ----------- | -------------------------------------------------------------- | ------- |
| widget      | `inputDateTimePicker`                                          |         |
| title       | The title to display above field                               |         |
| autoFocus   | Focus input on render                                          | `false` |
| disabled    | Disable the input                                              | `false` |
| placeholder | Text to display as placeholder                                 |         |
| readOnly    | Set the input as non modifiable and prevent datepicker to open | `false` |

```json
[
	{
		"key": "endDate",
		"widget": "inputDateTimePicker",
		"title": "End date",
		"autoFocus": false,
		"disabled": false,
		"placeholder": "Type the date here...",
		"readOnly": false
	}
]
```
