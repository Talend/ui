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
		<span className={`comp-list-row-data mandatory-field ${className}`}>
			<span className={'mandatory-field-label'}>{label}</span>
			<span className={'mandatory-field-info'}>{mandatory ? '*' : ''}</span>
		</span>
	);
}

MandatoryField.propTypes = {
	data: PropTypes.object,
	className: PropTypes.string,
};
