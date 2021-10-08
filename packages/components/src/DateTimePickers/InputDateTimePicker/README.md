# InputDateTimePicker

This component display an input with a datetime picker.

## props

| name | description |
|------|-------------|
| selectedDateTime | Datetime selected for initial rendering or to used in a controlled way<br/>- The provided date can either be an actual `Date`, a `number` (representing the timestamp) or a `string` in the specified format |
| onChange         | Trigger when defined datetime or error change (event, errorMessage, datetime)<br/>- Return the event object which validate the change, the error message (or undefined) and a valid Date object (or undefined if no date chosen or an InvalidDate if an error occurs) |
| onBlur           | Trigger when the component loose focus (outside the picker AND the input)|
| dateFormat       | Default `YYYY-MM-DD`. A combination of `YYYY` (year), `MM` (month), `DD` (day). Other format are consider invalid. |
| useSeconds       | Display and convert the seconds |
| useUTC           | Default `false` convert the date to UTC for the output and convert the input selectedDate (UTC) to retrieve the utc values. |

All the remaining props are spread to the input

## required props
| name | description |
|------|-------------|
| required         | Accept empty value or not |

The required props is here to allow empty values and so call the onChange callback when emptying the value

