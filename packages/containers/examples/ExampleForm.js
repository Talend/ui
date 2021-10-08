import React from 'react';

import Form from '../src/Form';

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
		"firstName": {
		  "type": "string",
		  "title": "First name"
		},
		"lastName": {
		  "type": "string",
		  "title": "Last name"
		},
		"age": {
		  "type": "integer",
		  "title": "Age"
		},
		"bio": {
		  "type": "string",
		  "title": "Bio"
		},
		"password": {
		  "type": "string",
		  "title": "Password",
		  "minLength": 3
		},
		"enum": {
		  "type": "string",
		  "title": "Enum",
		  "enum": [
			"1",
			"two",
			"three"
		  ]
		}
	  }
	},
	"uiSchema": {
	  "firstName": {
		"ui:autofocus": true
	  },
	  "age": {
		"ui:widget": "updown"
	  },
	  "bio": {
		"ui:widget": "textarea"
	  },
	  "password": {
		"ui:widget": "password",
		"ui:help": "Hint: Make it strong!"
	  }
	},
	"properties": {
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

export default function HeaderBarExample() {
	return <SchemaInState />;
}
