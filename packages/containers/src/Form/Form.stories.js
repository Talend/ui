import React from 'react';

import Form from '.';

const SCHEMA = `{
	"jsonSchema": {
	  "title": "A registration form",
	  "description": "A simple form example.",
	  "type": "object",
	  "required": [
		"firstName",
		"lastName"
	  ],
	  "properties": {
		"firstName": { "type": "string" },
		"lastName": { "type": "string" },
		"age": { "type": "integer" },
		"bio": { "type": "string" },
		"password": { "type": "string",  "minLength": 3 },
		"enum": {  "type": "string", "enum": ["1", "two", "three"] }
	  }
	},
	"uiSchema": [
	  { "key": "firstName", "title": "First name", "autofocus": true },
	  { "key": "age", "title": "Age" },
	  { "key": "bio", "title": "Bio", "widget": "textarea" },
	  { "key": "password", "title": "Password", "type": "password", "description": "Hint: Make it strong!" }
	],
	"data": {
	  "firstName": "Chuck",
	  "lastName": "Norris",
	  "age": 75,
	  "bio": "Roundhouse kicking asses since 1940",
	  "password": "noneed"
	}
  }
`;

class SchemaInState extends React.Component {
	constructor(props) {
		super(props);
		this.state = { schema: SCHEMA };
		this.onChange = this.onChange.bind(this);
	}

	onChange(event) {
		this.setState({ schema: event.target.value });
	}

	render() {
		return (
			<div className="container">
				<div className="col-md-6">
					<Form {...JSON.parse(this.state.schema)} />
				</div>
				<div className="col-md-6">
					<h2>Schema</h2>
					<textarea
						rows="20"
						className="form-control"
						onChange={this.onChange}
						value={this.state.schema}
					/>
				</div>
			</div>
		);
	}
}

export default {
	title: 'Form',
};

export function Default() {
	return <SchemaInState />;
}
