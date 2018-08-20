import React from 'react';
import PropTypes from 'prop-types';

function FieldTemplate(props) {
	return (
		<div className="form-group">
			<dt>
				<label htmlFor={props.id} className="control-label">
					{props.label}
				</label>
			</dt>
			<dd id={props.id}>{props.children}</dd>
		</div>
	);
}

if (process.env.NODE_ENV !== 'production') {
	FieldTemplate.propTypes = {
		children: PropTypes.node,
		id: PropTypes.string,
		label: PropTypes.string,
	};
}
FieldTemplate.displayName = 'FieldTemplate';

export default FieldTemplate;
