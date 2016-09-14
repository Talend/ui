import React from 'react';

import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import BCheckbox from 'react-bootstrap/lib/Checkbox';

const Checkbox = (props) => <FormGroup>
	<ControlLabel>{props.name}</ControlLabel>
	<BCheckbox
		checked={props.formData || props.schema.default}
		label={props.name}
		required={props.required}
		onChange={props.onChange}
	/>
</FormGroup>;

Checkbox.propTypes = {
	required: React.PropTypes.bool,
	schema: React.PropTypes.object.isRequired,
	name: React.PropTypes.string,
	formData: React.PropTypes.bool,
	onChange: React.PropTypes.func,
};

export default Checkbox;
