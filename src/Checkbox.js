import React from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import BCheckbox from 'react-bootstrap/lib/Checkbox';

const Checkbox = ({ formData, name, onChange, required }) => <FormGroup>
	<ControlLabel>{name}</ControlLabel>
	<BCheckbox
		checked={formData || false}
		label={name}
		required={required}
		onChange={(e) => onChange(e.target.checked)}
	/>
</FormGroup>;

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
