import React from 'react';

import PropTypes from 'prop-types';

import DefaultValueRenderer from '../DefaultCellRenderer/DefaultValueRenderer.component';

import theme from './DefaultIntCell.module.scss';

export default function DefaultIntCellRenderer({ value }) {
	return <DefaultValueRenderer value={value} className={theme['td-cell-int']} />;
}

DefaultIntCellRenderer.propTypes = {
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
