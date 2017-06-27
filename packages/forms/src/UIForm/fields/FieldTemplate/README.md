# Instructions to create a field

## Props

| Props | Description |
|---|---|
| id | The field ready-to-use id. You don't need to create a new one based on the props |
| isValid | The field value validity |
| errorMessage | The error message to display if the field is invalid |
| onChange | The onChange callback. This will trigger the `trigger:after` if precised in the schema. No need to trigger it yourself |
| onTrigger | The onTrigger callback. |
| schema | The json-schemaform-core merged schema. Its content depends on your schema |
| value | The field value |

### Common pattern

There is a common pattern to all fields : a form-group, a label (optional), the field, a description (optional), an error message if invalid.

Those elements are managed by the `<FieldTemplate>` component. Just use it in your render method. All its props can be found in your field `props` or `props.schema`.

```javascript
<FieldTemplate
    description={description}
    errorMessage={errorMessage}
    id={id}
    isValid={isValid}
    labelAfter={title}
>
    <input {...inputProps} />
</FieldTemplate>
```

There are 2 ways to display the title :
 * `displayBefore`: set the label before the field
 * `displayAfter`: set the label after the field. This is used for `<input>` for example to be material-style css compliant.
