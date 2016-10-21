import React from 'react';

import BFormGroup from 'react-bootstrap/lib/FormGroup';
import BControlLabel from 'react-bootstrap/lib/ControlLabel';
import BFormControl from 'react-bootstrap/lib/FormControl';
import BHelpBlock from 'react-bootstrap/lib/HelpBlock';

const REQUIRED_FIELD_SYMBOL = "*";

const Input = ({ formData, name, onChange, schema, required, type, helpMessage }) => (
	<BFormGroup>
		<BControlLabel>
			{schema.title ? schema.title : name }
			{required ? REQUIRED_FIELD_SYMBOL: ''}
		</BControlLabel>
		<BFormControl
			type={type}
			value={formData || schema.default}
			required={required}
			onChange={(e) => onChange(e.target.value)}
		/>
		<BFormControl.Feedback />
		<BHelpBlock>{helpMessage}</BHelpBlock>
	</BFormGroup>
);

Input.propTypes = {
	formData: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.number,
	]),
	name: React.PropTypes.string,
	onChange: React.PropTypes.func,
	required: React.PropTypes.bool,
	schema: React.PropTypes.object.isRequired,
	type: React.PropTypes.string,
};

Input.defaultProps = {
	required: false,
};

export default Input;
