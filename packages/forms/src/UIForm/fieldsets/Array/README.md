# Array

This widget allows you to create arrays of simple fields/widgets or objects

**Json Schema**

Array of simple strings

```json
{
  "type": "object",
  "title": "Comment",
  "required": [
    "comments"
  ],
  "properties": {
    "comments": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}
```


Array of objects { name, email, comment }

```json
{
  "type": "object",
  "title": "Comment",
  "required": [
    "comments"
  ],
  "properties": {
    "comments": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "email": {
            "type": "string",
            "pattern": "^\\S+@\\S+$"
          },
          "comment": {
            "type": "string",
            "maxLength": 20
          }
        },
        "required": [
          "name",
          "comment"
        ]
      }
    }
  }
}
```

**UI Schema**

| Property | Description | Default |
|---|---|---|
| reorder | An optional flag to enable/disable reorder. | `true` |
| itemWidget | An optional widget to render each item. | `fieldset` |
| items | An array of field/fieldset definitions that is included in each array object |  |

Array of simple strings

```json
["users"]
```

Array of objects

```json
[
  {
    "key": "comments",
    "items": [
      {
        "key": "comments[].name",
        "title": "Name"
      },
      {
        "key": "comments[].email",
        "title": "Email",
        "description": "Email will be used for evil."
      },
      {
        "key": "comments[].comment",
        "title": "Comment",
        "type": "textarea",
        "rows": 3,
        "validationMessage": "Don't be greedy!"
      }
    ]
  }
]
```

**Result**

![Array](screenshot.jpg)
