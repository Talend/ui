import React from 'react';

import PropTypes from 'prop-types';

import DefaultValueRenderer from '../DefaultCellRenderer/DefaultValueRenderer.component';
import { dateToString } from './date';

export default function DefaultDateCellRenderer({ value }) {
	return <DefaultValueRenderer value={dateToString(value)} className={'td-cell-date'} />;
}

DefaultDateCellRenderer.propTypes = {
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
