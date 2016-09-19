# react-bootstrap-forms

## Installation

Run `npm install react-bootstrap-forms`.

## Usage

The forms can be used like any other React components.
You'll have to pass it a JSONSchema and a onSubmit callback as a minimum to
handle forms rendering and get the data back.

```javascript
import Form from 'react-bootstrap-forms';

class MyForm extends React.Component {

	onSubmit(formData) {
		console.log(formData);
	}

	render() {
		return (
			<Form schema={this.props.schema} onSubmit={this.onSubmit} />
		);
	}
}
```

## LICENSE

Copyright (c) 2006-2016 Talend

Licensed under the Apache V2 License
