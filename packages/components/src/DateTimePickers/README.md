# ReadMe

## Architecture

[**_InputDateTimePicker_**](./InputDateTimePicker/README.md) is the full component usable in apps as is. It integrates the main picker in a dropdown and sycnhronize users actions between it and the input.

[**_CalendarPicker_**](./CalendarPicker/README.md) is the main picker component which rely on two views in the **_views_** folder :

- **_DateView_** for picking :
  - the final date (by choosing a day on a specific month calendar)
  - the time
- **_MonthYearView_** for picking :
  - the month
  - the year

_/!\ Month and year pickers are used to defined what month calendar is displayed on the **_DateView_** view, not to define directly the final date /!\\_

Each view displays the picker units (month, year, date, time, etc.) needed, findable in the **_pickers_** folder.

All code fragments used accross multiples folders are stored in the **_shared_** folder.
