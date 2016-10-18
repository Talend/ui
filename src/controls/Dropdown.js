import React from 'react';

import { optionsList } from 'react-jsonschema-form/lib/utils';

import BFormGroup from 'react-bootstrap/lib/FormGroup';
import BControlLabel from 'react-bootstrap/lib/ControlLabel';
import BFormControl from 'react-bootstrap/lib/FormControl';
import BHelpBlock from 'react-bootstrap/lib/HelpBlock';

const Dropdown = ({ name, onChange, schema, helpMessage }) => (
	<BFormGroup>
		<BControlLabel>{name}</BControlLabel>
		<BFormControl
			componentClass="select"
			label={name}
			onChange={(e) => onChange(e.target.value)}
		>
			{optionsList(schema).map((o, i) => <option key={i} value={o.value}>{o.label}</option>)}
		</BFormControl>
		<BFormControl.Feedback />
		<BHelpBlock>{helpMessage}</BHelpBlock>
	</BFormGroup>
);

Dropdown.propTypes = {
	name: React.PropTypes.string,
	onChange: React.PropTypes.func,
	schema: React.PropTypes.object.isRequired,
};

export default Dropdown;
