# InputDateTimePicker

This widget allows you to render a date/time picker.

## Data conversion

You can request 2 types of data :
* number : a timestamp
* string : the date in iso format

### Timestamp format

It's a number of milliseconds since 01 January, 1970 UTC.

### ISO-8601 Extended format

It's a string of a specific format of the [ISO-8601 Extended format](https://fr.wikipedia.org/wiki/ISO_8601) defined in the [EcmaScript specification](https://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15). Only the UTC format (Z without timezone at the end) can be used, all the parts are mandatory up to the fraction of second which is delimited with the dot.

Example : "2018-01-01T10:35:48.951Z"

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


## UI Schema

| Property              | Description                                                    | Default |
| --------------------- | -------------------------------------------------------------- | ------- |
| widget                | `date` or `datetime`                                           |         |
| title                 | The title to display above field                               |         |
| autoFocus             | Focus input on render                                          | `false` |
| disabled              | Disable the input                                              | `false` |
| placeholder           | Text to display as placeholder                                 |         |
| readOnly              | Set the input as non modifiable and prevent datepicker to open | `false` |
| options.useSeconds    | Enable the date picker seconds input                           | `false` |

```json
[
	{
		"key": "endDate",
		"widget": "datetime",
		"title": "End date",
		"autoFocus": false,
		"disabled": false,
		"placeholder": "Type the date here...",
		"readOnly": false,
		"options": { "useSeconds": true }
	}
]
```
