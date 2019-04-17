import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DefaultValueRenderer from '../DefaultCellRenderer/DefaultValueRenderer.component';
import { dateToString } from './date';

export default function DefaultDateCellRenderer({ data }) {
	return (
		<DefaultValueRenderer value={dateToString(data.value)} className={classNames('td-cell-date')} />
	);
}

DefaultDateCellRenderer.propTypes = {
	data: PropTypes.shape({
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	}),
};
