# TimePicker component

This component give access to the selection of a time (hour and minutes) of day in a scrollable list.

__/!\\__ *All times in this component represents a number of minutes since the beginning of the day (ex: 605 for 10:05 => 10\*60 + 5)* __/!\\__

## Props

| name           | description                                         |
| -------------- | --------------------------------------------------- |
| selectedTime   | Time in minutes displayed as selected <br> Must be an integer beetween 0 and 1439 inclusive (00:00 - 23:59)|
| interval       | __DEFAULT : 15__ Interval of minutes between each visual selectable value |
| onSelect       | __REQUIRED__ callback with time in minutes as argument|
