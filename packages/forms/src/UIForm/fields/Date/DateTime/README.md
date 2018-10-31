# InputDateTimePicker

This widget surprisingly allows you to render an InputDateTimePicker.

## Data conversion

The underlying _InputDateTimePicker_ component handles a Date object and the form handles the final submited format, which can be an iso string or a timestamp number. Thereby, a conversion need to be done, in both way, and some errors can occur. In case of an error, an InvalidDate is generated and spread to the destination either to the form or to the component.

### Procedure

The form give the value to the widget. It try to convert the value to a Date based on the form property type (number or string) and spread it to the _InputDateTimePicker_ component.

In the other way, the widget give a Date object to the widget, which is converted to number or string (still based on the form property type).

### Timestamp format

It's a number of milliseconds since 01 January, 1970 UTC. [The range](https://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.1) is defined by the maximal milliseconds (8,640,000,000,000,000) handle by the EcmaScript Date object (to either side of 01 January, 1970 UTC).

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
| widget      | `dateTime`                                                     |         |
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
