import React from 'react';
import PropTypes from 'prop-types';

/**
 * This component displays a data as a label with mandatory info.
 * The data must be an object { value: string, mandatory: boolean }.
 */
export default function MandatoryField({ data, className }) {
	const label = data.value;
	const mandatory = data.mandatory;
	return (
		<div className={`comp-list-row-data mandatory-field ${className}`}>
			<div className={'mandatory-field-label'}>{label}</div>
			<div className={'mandatory-field-info'}>{mandatory ? '*' : ''}</div>
		</div>
	);
}

MandatoryField.propTypes = {
	data: PropTypes.object,
	className: PropTypes.string,
};
