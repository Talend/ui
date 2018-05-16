# FormContainer

## override default ArrayFieldTemplate

in same fashion as the wrapped form component
the default ArrayFieldTemplate can be overided by a custom one
to do this simply pass the desired ArrayFieldTemplate to the Form#ArrayFieldTemplate props.

```javascript
<Container
	ArrayFieldTemplate={ArrayFieldTemplate}
	formId="test-form"
	jsonSchema={{ schema: true }}
	uiSchema={{ uiSchema: true }}
	actions={[]}
	className="foo"
	formProps={{ other: true }} // extra props
/>
```
