# Guide to UIForms

Getting started
* [Principles](./doc/principles.md): Discover what are jsonSchema, uiSchema, properties and errors
* [How to use @talend/react-forms](./doc/how-to-use.md): How to render your first UIForm

Customisation
* [Validation](./doc/validation.md): how validation works and how to add custom validation
* [Create new widgets](./doc/widgets.md): how create a new widget

Advanced
* [Triggers](./doc/triggers.md): hooks for advanced control over errors and properties


### Lifecycle

![lifecycle schema](http://www.plantuml.com/plantuml/png/ZP11IyGm48NlyolcBEp1rLCFibV1Wx17yH2RqGuaQKYcBYB-TsEJ3gq8zLHU-jx7bvooc2IJTp2m9IGVvGCjvJvn51u3F5qzu-5mX_U1XOqxYn7ga6l2rp5vFFS3UGFh1cgbnao2ClvdvlYTTZTG6vlffwhE-RghYtumuOsWdgtnKxJbO_72ClnHdKc529eNycqZ9og6i1mzhBrdw4QlzN21RboFZPYd5yyDULm_uGQhLrYAQleBUuDTMJY7YNeg8unfZ1dglqxrb1xeylZJQ3BrgMjRxxTVLPqlE56matVV)

The jsonSchema/uiSchema/properties/errors that is provided to UIForm are the initial values. Those values are stored (state or redux) and live their lives. They may be modified depending on user's actions.


### Conditional rendering

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


### Display mode

UIForm accept a `displayMode` props. The value `text` will switch display to a definition list, following the ui specs.

```javascript
import React from 'react';
import { UIForm } from '@talend/react-forms/lib/UIForm';

function MyComponent(props) {
	return (<UIForm
		{...props}
		displayMode="text"
	/>);
}
```

The rendered widgets will be selected with the name `${widgetId}_${displayMode}`.
For example, the textarea will be the one registered under `textarea_text` id.
You can pass custom widgets for text mode with the `widgets` props.


### Reset functionality
This form support `reset` out of the box, what you have to do is to have an `action` with a `reset` `type` given in the action array on the `actions` props.

When the definition url is used to load the first state of the form a copy is kept so in case the user use this reset action the live form state will be `reset` to this initial state.

Said copy is updated when the user submit the form or when the definition url is changed and that a new form definition is loaded.

#### Programatic reset
`initialData` this additional props serve one use, create a new saved initial state programaticaly.
This is specially usefull when this component is used by `containers/ComponentForm`.

When this value is provided, it is going to be used a the new initialState, if this value change over time, it will update the initialState.
(So it is very important not to create new references or useless mutation here)
