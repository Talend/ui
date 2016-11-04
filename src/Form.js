import React from 'react';

import RJSForm from 'react-jsonschema-form';

import Button from 'react-bootstrap/lib/Button';

import CustomFieldTemplate from './templates/CustomFieldTemplate';

import RadioOrSelectWidget from './widgets/RadioOrSelectWidget';

const customWidgets = {
	radioOrSelect: RadioOrSelectWidget,
};

const customUiSchema = {
	'ui:widget': 'radioOrSelect',
};

class Form extends React.Component {

	constructor(props) {
		super(props);
		this.handleSchemaChange = this.handleSchemaChange.bind(this);
		this.handleSchemaSubmit = this.handleSchemaSubmit.bind(this);
	}

	handleSchemaSubmit(change) {
		// TODO: Handle Schema Submit
		return this.props.onSubmit && this.props.onSubmit(change);
	}

	handleSchemaChange(change) {
		// TODO: Handle Schema Change
		return this.props.onChange && this.props.onChange(change);
	}

	render() {
		const schema = this.props.data && this.props.data.jsonSchema;
		if (!schema) {
			throw 'You must provide data with valid JSON Schema';
		}
		const uiSchema = {
			...(this.props.data && this.props.data.uiSchema),
			...customUiSchema,
		};
		const formData = this.props.data && this.props.data.properties;
		const actions = this.props.actions ? this.props.actions.map((action, index) => (
			<Button
				key={index}
				bsStyle={action.style}
				type={action.type}
				onClick={action.onClick}
				title={action.title}
			>
				{action.icon ? <i className={action.icon} /> : null }
				{action.label}
			</Button>
		)) : <Button bsStyle="primary" type="submit">Submit</Button>;
		return (
			<RJSForm
				{...this.props}
				schema={schema}
				uiSchema={uiSchema}
				formData={formData}
				FieldTemplate={CustomFieldTemplate}
				widgets={customWidgets}
				onChange={this.handleSchemaChange}
				onSubmit={this.handleSchemaSubmit}
			>
				{actions}
			</RJSForm>
		);
	}
}

Form.propTypes = {
	data: React.PropTypes.shape({
		jsonSchema: React.PropTypes.object.isRequired,
		uiSchema: React.PropTypes.object,
		properties: React.PropTypes.object,
	}).isRequired,
	onChange: React.PropTypes.func,
	onSubmit: React.PropTypes.func,
	actions: React.PropTypes.arrayOf(React.PropTypes.shape({
		style: React.PropTypes.string,
		type: React.PropTypes.oneOf(['submit', 'reset', 'button']),
		onClick: React.PropTypes.func,
		label: React.PropTypes.string,
		icon: React.PropTypes.string,
		title: React.PropTypes.string,
	})),
};

export default Form;
