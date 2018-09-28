# InputDateTimePicker

This widget surprisingly allows you to render an InputDateTimePicker.

## Data conversion

The underlying _InputDateTimePicker_ component handles a Date object and the form handles the final submited format, which can be an iso string or a timestamp number. Thereby, a conversion need to be done, in both way, and [some errors can occur](#error-handling).

### Procedure

The form give the value to the widget. It try to convert the value to a Date based on the form property type (number or string) and spread it to the _InputDateTimePicker_ component.

In the other way, the widget give a Date object to the widget, which is converted to number or string (is still based on the form property type).

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

## Error handling

### Widget error

Those type of errors occur when the text input typed don't match the format required. An error message is sent to the widget, which wrap it in an Error object and spread it to the form as the value.

The form interpret the Error object value as an error and extract the message before any other checks (require check, type check, custom check, etc.). The error is giving back to the widget in the normal path as the _errorMessage_. The last widget value held in widget state is spread to the component and not the Error object.

### Form data error

Those type of errors occur when the data is invalidated by the form.

If the data has an invalid format and therefore is impossible to convert to a valid Date, an InvalidDate is spread to the component and the _widget generic format error_ is used as an override of the _form error message_ to display.

If the data is a valid format and can be converted to a valid Date but some rule is not validated (like a range rule or a value required), the value is spread as is to the component and the _form error message_ is kept to display.
