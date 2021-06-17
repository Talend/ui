# TimezoneList

This widget can be used to provide a field to select a timezone (amongst IANA-listed timezones). Returned value is the standard name of the timezone ("Europe/Paris", "America/Los_Angeles" ...).

Technically, it's just a wrapper around [`Datalist` widget](../Datalist/README.md) that automatically feeds the available options.

>
> This component could be improved to automatically load translations (so that forms using this field only need to specify a language key and translations are automatically fetched).
> Such feature requires the field to lazy-load translation files by itself (which is a mechanism we currently do not support).
>

## JSON Schema

JSON schema is simple, the field only requires to be declared as a `string` value. No need to enumerate allowed values (this is managed by the widget).

```json
{
  "type": "object",
  "properties": {
    "timezone": {
      "type": "string"
    }
  }
}
```

## UI Schema

| Property      | Description                                                                                                 | Type   | Default |
|---------------|-------------------------------------------------------------------------------------------------------------|--------|---------|
| ...           | Any config that should be forwarded to `Datalist` widget                                                    | N/A    | N/A     |
| lang          | The language timezones should be displayed in (`en`, `fr`, `de`, `ja`)                                      | String |         |
| cldrTimezones | Timezones translations issued from `cldr-dates-full`. The key is the one used to match the `lang` parameter | Object |         |

```json
[
    {
      "key": "timezone",
      "restricted": false,
      "title": "Timezone selection",
      "widget": "timezoneList",
      "lang": "fr",
      "cldrTimezones": {
        "fr": {
          // Content of cldr-dates-full timezone translation files corresponding to the "lang" parameter.
          // (cldr-dates-full/main/fr/timeZoneNames.json here, for example)
        }
      }
    }
  ]
```

## Result

![TimezoneList](screenshot.gif)
