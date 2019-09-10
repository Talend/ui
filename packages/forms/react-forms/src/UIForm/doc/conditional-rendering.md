# Conditional rendering

It is possible to render parts of the forms defined in uiSchema, depending on properties values.
The uiSchema accepts a `condition` property, which use [jsonLogic](http://jsonlogic.com). So please first go their and read the doc.


Let's take this example:
```json
{
  "jsonSchema": {
    "type": "object",
    "title": "Comment",
    "properties": {
      "entity": {
        "type": "object",
        "properties": {
          "kind": {
            "type": "string",
            "enum": ["human", "animal", "thing"]
          },
          "civility": {
            "type": "string",
            "enum": ["Mr", "Mrs"]
          },
          "lastname": {
            "type": "string"
          },
          "firstname": {
            "type": "string"
          }
        }
      }
    }
  }
}
```

We want
* `civility` to appear only for humans
* `lastname` and `firstname` to appear only for humans and animals

```json
{
  "uiSchema": [
    {
      "widget": "fieldset",
      "condition": {
        "in": [{ "var": "entity.kind"}, ["human", "animal"]]
      },
      "items": [
        {
          "key": "entity.civility",
          "title": "Civility",
          "description": "This should be visible only for humans",
          "condition": {
            "===": [{ "var": "entity.kind"}, "human"]
          }
        },
        {
          "key": "entity.lastname",
          "title": "Last Name",
          "description": "This should be visible only for humans and animals"
        },
        {
          "key": "entity.firstname",
          "title": "First Name",
          "description": "This should be visible only for humans and animals"
        }
      ]
    }
  ]
}
```


## Next

[Go to next step: Validation](./validation.md)
