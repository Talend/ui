# @talend/utils - Date utils

## Usage

Date utils are exposed in @talend/utils:

```javascript
import { date } from '@talend/utils';

// ...

function MyComponent() {
  const now = new Date();
  const convertedDate = date.convertToTimeZone(now);
}
```

## Methods

### convertToLocalTime(date, options)

Converts the given date from the given time zone to the local time and returns a new Date object.

| Argument           | Description                     | Type                     |
|--------------------|---------------------------------|--------------------------|
| `date`             | Date to convert                 | Date \| number \| string |
| `options`          | Object of options               | Object                   |
| `options.timeZone` | Timezone of the date to convert | String                   |

**Return**: Date object

### convertToTimeZone(date, options)

Converts the given date from the local time to the given time zone and returns a new Date object.

| Argument           | Description                     | Type                     |
|--------------------|---------------------------------|--------------------------|
| `date`             | Date to convert                 | Date \| number \| string |
| `options`          | Object of options               | Object                   |
| `options.timeZone` | Target timezone                 | String                   |

**Return**: Date object

### formatToTimeZone(date, formatString, options)

Returns the formatted date string in the given format, after converting it to the given time zone.

| Argument           |           Description                            | Type                     |
|--------------------|--------------------------------------------------|--------------------------|
| `date`             | Date to convert                                  | Date \| number \| string |
| `formatString`     | String output format (see date-fns' `format()`)  | String                   |
| `options`          | Object of options (see convertToTimeZone)        | Object                   |

**Return**: String

### convertToUTC(date)

Convert a date in local timezone to UTC.

| Argument           |           Description                            | Type                     |
|--------------------|--------------------------------------------------|------|
| `date`             | Date to convert                                  | Date |

**Return**: Date

### timeZoneExists(timeZone)

Check wether a timezone exists or not.

| Argument           |           Description                            | Type |
|--------------------|--------------------------------------------------|------|
| `timeZone`         | Timezone to check                                | Date |

**Return**: Boolean

### format(date, dateOption, lang)

Format a date to a specific format and in the expected language.

| Argument           |           Description                                       | Type                     |
|--------------------|-------------------------------------------------------------|--------------------------|
| `date`             | Date to format                                              | Date \| number \| string |
| `dateOption`       | Comes from utils.FORMAT: MDY_LONG, MY_LONG, MDY, MDYHM, ... | string                   |
| `lang`             | The lang: en, fr, ja, de, ...                               | string                   |

**Return**: String
