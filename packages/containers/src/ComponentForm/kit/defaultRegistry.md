# Default triggers

## `update`

This trigger let the backend modify the current form state dynamicly.
This is quite dangerous so it should be used only with buttons so the user request a change in the form.

For example lets take a contact form.
Once the user has set the zip code you may want to fill the city.

So the trigger may look like this:

```javascript
{
    "action":"guessCity",
    "family":"odoo",
    "type":"update"
    "parameters":[
        {
            "key":"zip",
            "path":"address.zip"
        }
    ],
    "options":[
        {
            "path":"address.city",
            "type": "string"
        }
    ],
}
```

So this one will send the city to the backend which will answer a response like

```javacript
{ data: 'Nantes' }
```

which will be set in the form properties into `address.city`
