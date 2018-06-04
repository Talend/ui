import React from 'react';
import PropTypes from 'prop-types';
import { ActionButton } from '../index';

function getLabel(data, label) {
	return label ? label : data;
}

/**
 * This component displays a header of a table column as an ActionButton.
 * The action props { label } can be provided by data or by extra.label.
 * The other action props { icon, onClick, etc } are provided by extra props.
 *
 */
export default function TableActionHeader({ data, className, extra }) {
	const { label, ...otherActionProps } = extra.actionProps;
	return (
		<ActionButton
			className={`tc-table-action-header ${className}`}
			label={getLabel(data, label)}
			{...otherActionProps}
		/>
	);
}

TableActionHeader.propTypes = {
	data: PropTypes.string,
	className: PropTypes.string,
	extra: PropTypes.shape({
		actionProps: PropTypes.object,
	}),
};
