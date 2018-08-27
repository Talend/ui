# InputDateTimePicker

This component display an input with a [datetime picker](../DateTimePicker/DateTimePicker.md) for choosing a datetime.

## props

- **selectedDateTime** : Datetime selected for initial rendering or to used in a controlled way
  - An InvalidDate object can be given resulting in a message indicating the date is not valid in the input
  - Update the internal state only when needed
- **onChange** : Trigger when defined datetime or error change (event, errorMessage, datetime)
  - Return the event object which validate the change, the error message (or undefined) and a valid Date object (or undefined if no date chosen or if an error occurs)
- **onBlur** : Trigger when the component loose focus (outside the picker AND the input), give the event object as first arg only
- The remaining props are spread to the input
