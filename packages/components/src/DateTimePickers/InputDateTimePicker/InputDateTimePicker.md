# InputDateTimePicker

This component display an input with a [datetime picker](../DateTimePicker/DateTimePicker.md) for choosing a datetime.

## props

- **selectedDateTime** : Initial datetime defined
    - it's used only at construct time
    - need to be a valid Date object if set
- **onChange** : Trigger when defined datetime change
    - Can return in first arg a valid Date object or undefined (if no date chosen or if an error occurs)
- **onError** : Trigger when the error change
    - Can return in first arg a string message or undefined if no error
- The remaining props are spread to the input
