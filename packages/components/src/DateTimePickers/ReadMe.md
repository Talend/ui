# DateTimePicker

## Props

## Folder structure

**_DateTimePicker_** is the main picker component which rely on two views in the **_views_** folder :
- **_DateTime_** : for picking the full date by choosing a day on a specific month calendar and for picking the time
- **_MonthYear_** : for picking the month and year used to defined what month calendar is displayed on the **_DateTime_** view

Each view displays the fragments pickers (month, year, date, time, etc.) needed, findable in the **_pickers_** folder.

All other components are used across the others components restricted to the folder scope (same level or children hierarchy).
