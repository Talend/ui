# InputDateTimePicker

This widget allows you to render a date/time picker.

## Data conversion

You can request 3 format :
* timestamp (number)
* ISO-8601 extended format (string)
* custom date format (limited range of format)

### Timestamp format

It's a number of milliseconds since 01 January, 1970 UTC.

### ISO-8601 Extended format

It's a string of a specific format of the [ISO-8601 Extended format](https://fr.wikipedia.org/wiki/ISO_8601) defined in the [EcmaScript specification](https://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15). Only the UTC format (Z without timezone at the end) can be used, all the parts are mandatory up to the fraction of second which is delimited with the dot.

Example : "2018-01-01T10:35:48.951Z"

### Custom format

It can only be a combination of `YYYY`, `MM` and `DD`.

Good examples : `DD/MM/YYYY` - `YYYY-MM-DD`
Bad examples : `YYYY MMM DD` - `MM DD`

## Json Schema

| Property | Description                                                                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type     | `string` or `number`                                                                                                                                                      |
| format   | `iso-datetime` (string type) or `timestamp` (number type). This field is optional and is used for iso-8601 and timestamp validation. For other formats, leave this empty. |

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

| Property              | Description                                                                                                                                       | Default       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| widget                | `date` or `datetime`                                                                                                                              |               |
| title                 | The title to display above field                                                                                                                  |               |
| autoFocus             | Focus input on render                                                                                                                             | `false`       |
| disabled              | Disable the input                                                                                                                                 | `false`       |
| placeholder           | Text to display as placeholder                                                                                                                    |               |
| readOnly              | Set the input as non modifiable and prevent datepicker to open                                                                                    | `false`       |
| options.dateFormat    | A combination of `YYYY`, `MM`, `DD`. This is used for display purpose. If no format is defined in jsonSchema, this is the value date format too.  | `YYYY-MM-DD`  |
| options.useSeconds    | Enable the date picker seconds input                                                                                                              | `false`       |
| options.useUTC        | Selected date is considered to be in UTC timezone (GMT)                                                                                           | `false`       |

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
		"options": { "useSeconds": true, "useUTC": true }
	}
]
```
