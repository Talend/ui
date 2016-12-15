import React, { PropTypes } from 'react';

import {
	black as color1,
	lightBlack as color2,
	lime800 as color3,
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RJSForm from 'rjsf-material-design/lib/index';
import Button from 'react-bootstrap/lib/Button';
import ObjectField from './fields/ObjectField';
import StringField from './fields/StringField';
import RadioOrSelectWidget from './widgets/RadioOrSelectWidget';

/**
 * @type {string} After trigger name for field value has changed
 */
const TRIGGER_AFTER = 'after';

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

	handleSchemaSubmit(changes) {
		if (this.props.onSubmit) {
			this.props.onSubmit(changes);
		}
	}

	/**
	 * Handle changes only if modified field has "ui:trigger" option
	 * @param changes New formData
	 * @param id Form id is provided
	 * @param name Name of the modified field
	 * @param value New value of the field
	 * @param options Options from uiSchema for this field
	 */
	handleSchemaChange(changes, id, name, value, options) {
		const triggers = options && options.trigger;
		if (triggers && triggers.indexOf(TRIGGER_AFTER) !== -1) {
			if (this.props.onChange) {
				this.props.onChange(changes, id, name, value);
			}
		}
	}

	render() {
		const schema = this.props.data && this.props.data.jsonSchema;
		if (!schema) {
			throw Error('You must provide data with valid JSON Schema');
		}

		const uiSchema = {
			...(this.props.data && this.props.data.uiSchema),
			...customUiSchema,
		};

		const formData = this.props.data && this.props.data.properties;

		const customFields = {
			ObjectField,
			StringField,
		};

		const customFormContext = {
			handleSchemaChange: this.handleSchemaChange,
		};

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
		const defaultMuiTheme = {
			palette: {
				textColor: color1,
				primary1Color: color2,
				accent1Color: color3,
			},
		};
		const muiTheme = getMuiTheme({
			...defaultMuiTheme,
			...this.props.theme,
		});
		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<RJSForm
					{...this.props}
					schema={schema}
					uiSchema={uiSchema}
					formData={formData}
					formContext={customFormContext}
					fields={customFields}
					widgets={customWidgets}
					onChange={undefined}
					onSubmit={this.handleSchemaSubmit}
				>
					<div className={this.props.buttonBlockClass}>
						{actions}
					</div>
				</RJSForm>
			</MuiThemeProvider>
		);
	}
}

export const DataPropTypes = PropTypes.shape({
	jsonSchema: PropTypes.object.isRequired,
	uiSchema: PropTypes.object,
	properties: PropTypes.object,
});

export const ActionsPropTypes = PropTypes.arrayOf(PropTypes.shape({
	style: PropTypes.string,
	type: PropTypes.oneOf(['submit', 'reset', 'button']),
	onClick: PropTypes.func,
	label: PropTypes.string,
	icon: PropTypes.string,
	title: PropTypes.string,
}));

Form.propTypes = {
	data: DataPropTypes.isRequired,
	theme: PropTypes.object,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	actions: ActionsPropTypes,
	buttonBlockClass: PropTypes.string,
};

Form.defaultProps = {
	buttonBlockClass: 'form-actions',
};

export default Form;
