import React from 'react';

import BFormGroup from 'react-bootstrap/lib/FormGroup';
import BControlLabel from 'react-bootstrap/lib/ControlLabel';
import BCheckbox from 'react-bootstrap/lib/Checkbox';
import BFormControl from 'react-bootstrap/lib/FormControl';
import BHelpBlock from 'react-bootstrap/lib/HelpBlock';

const Checkbox = ({ formData, name, onChange, required, helpMessage }) => (
	<BFormGroup>
		<BControlLabel>{name}</BControlLabel>
		<BCheckbox
			checked={formData}
			label={name}
			required={required}
			onChange={(e) => onChange(e.target.checked)}
		/>
		<BFormControl.Feedback />
		<BHelpBlock>{helpMessage}</BHelpBlock>
	</BFormGroup>
);

Checkbox.propTypes = {
	formData: React.PropTypes.bool,
	name: React.PropTypes.string,
	onChange: React.PropTypes.func,
	required: React.PropTypes.bool,
};

Checkbox.defaultProps = {
	formData: false,
};

export default Checkbox;
