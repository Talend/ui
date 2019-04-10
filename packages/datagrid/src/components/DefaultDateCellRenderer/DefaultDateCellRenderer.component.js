import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DefaultValueRenderer from '../DefaultCellRenderer/DefaultValueRenderer.component';

export default function DefaultDateCellRenderer({ data }) {
	let dateValue = data.value;

	if (data.value !== null) {
		try {
			dateValue = new Date(data.value).toISOString();
		} catch (e) {
			dateValue = data.value;
		}
	}

	return <DefaultValueRenderer value={dateValue} className={classNames('td-cell-date')} />;
}

DefaultDateCellRenderer.propTypes = {
	data: PropTypes.shape({
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	}),
};
