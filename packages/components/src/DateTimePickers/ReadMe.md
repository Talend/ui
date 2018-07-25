# DateTimePicker

## Props

## Architecture

**_InputDateTimePicker_** is the full component usable in apps as is. It integrates the main picker in a dropdown and sycnhronize users actions between it and the input.

**_DateTimePicker_** is the main picker component which rely on two views in the **_views_** folder :
- **_DateTimeView_** : for picking :
    - the full date (by choosing a day on a specific month calendar)
    - the time
- **_MonthYearView_** : for picking :
    - the month
    - the year

 _/!\ Month and year pickers are used to defined what month calendar is displayed on the **_DateTimeView_** view, not to define directly the final date /!\\_

Each view displays the fragments pickers (month, year, date, time, etc.) needed, findable in the **_pickers_** folder.

All other components are used across the others components restricted to the folder scope (same level or children hierarchy).
