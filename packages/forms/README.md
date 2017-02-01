# react-talend-forms

[![Build Status](https://travis-ci.org/Talend/react-talend-forms.svg?branch=master)](https://travis-ci.org/Talend/react-talend-forms)

## Introduction

This library is designed to be used on top of [react-jsonschema-form](https://mozilla-services.github.io/react-jsonschema-form/), a React component for building Web forms from JSONSchema.

In addition of Mozilla lib, this wrapper uses [react-bootstrap](https://react-bootstrap.github.io/) to not have to maintain Bootstrap markup.

## Installation

Run `npm install --save react-talend-forms`.

## Usage

The forms can be used like any other React components.
You'll have to pass it a JSONSchema and a onSubmit callback as a minimum to
handle forms rendering and get the data back.

```javascript
import Form from 'react-talend-forms';

class MyForm extends React.Component {

	onSubmit(formData) {
		console.log(formData);
	}

	onCancel() {
		console.log('Cancelled');
	}

	render() {
		const actions = [
			{ style: 'link', onClick: this.onCancel, type: 'button', label: 'CANCEL' },
			{ style: 'primary', type: 'submit', label: 'VALIDATE' },
		];
		return (
			<Form data={this.props.data} actions={actions} onSubmit={this.onSubmit} />
		);
	}
}
```

Here is the archetype of the data property required to render the form:
```json
{
	"jsonSchema": {},
	"uiSchema": {},
	"properties": {}
}
```


### Handlers

If uiSchema has some triggers like

```json
{
  "jsonSchema": {
    "id": "ListExample",
    "type": "object",
    "properties": {
      "propertyName": {
        "type": "string",
        "enum": [
          "option 0",
          "option 1",
          "option 2"
        ]
      }
    }
  },
  "uiSchema": {
    "propertyName": {
      "ui:trigger": [ "after" ]
    }
  },
  "properties": {}
}
```

Then `onChange` will be triggered when `propertyName` field value has changed.

```javascript
import Form from 'react-talend-forms';

class MyForm extends React.Component {

	onChange(formData, formId, propertyName, propertyValue) {
		console.log(formData, formId, propertyName, propertyValue);
	}

	onSubmit(formData) {
		console.log(formData);
	}

	render() {
		return (
			<Form
			    data={this.props.data}
			    onChange={this.onChange}
			    onSubmit={this.onSubmit}
			/>
		);
	}
}
```

### PropTypes

The data and actions PropTypes are exported for easy reuse.
You can use them by importing the DataPropTypes and ActionsPropTypes functions.
```javascript
import Form, { DataPropTypes, ActionsPropTypes } from 'react-talend-forms'
```

## LICENSE

Copyright (c) 2006-2016 Talend

Licensed under the Apache V2 License
