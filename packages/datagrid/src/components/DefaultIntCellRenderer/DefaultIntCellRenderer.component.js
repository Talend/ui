import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import theme from './DefaultIntCell.scss';

export default function DefaultIntCellRenderer({ data }) {
	return <div className={classNames(theme['td-cell-int'], 'td-cell-int')}>{data.value}</div>;
}

DefaultIntCellRenderer.propTypes = {
	data: PropTypes.shape({
		value: PropTypes.string,
	}),
};
