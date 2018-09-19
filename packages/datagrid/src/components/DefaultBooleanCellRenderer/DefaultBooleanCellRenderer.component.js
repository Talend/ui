import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DefaultValueRenderer from '../DefaultCellRenderer/DefaultValueRenderer.component';

export default function DefaultBooleanCellRenderer({ data }) {
	// convert the boolean to string to render this value
	const value = String(data.value);
	return <DefaultValueRenderer value={value} className={classNames('td-cell-boolean')} />;
}

DefaultBooleanCellRenderer.propTypes = {
	data: PropTypes.shape({
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
	}),
};
