# DateTimePicker

This component display a datetime picker

## props

- **selection** : The datas used to control the current selection
    - object format with :
        - _Date_ prop as a Date object
        - _time_ prop as a number of seconds since the beginning of the date
- **onSubmit** : Trigger when defined datetime picked is submit
    - return in first arg an object with the same format as _selection_ prop
