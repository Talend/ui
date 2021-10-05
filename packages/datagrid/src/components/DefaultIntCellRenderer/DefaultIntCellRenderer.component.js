import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DefaultValueRenderer from '../DefaultCellRenderer/DefaultValueRenderer.component';
import theme from './DefaultIntCell.scss';

export default function DefaultIntCellRenderer({ data }) {
	return (
		<DefaultValueRenderer
			value={data.value}
			className={classNames(theme['td-cell-int'], 'td-cell-int')}
		/>
	);
}

DefaultIntCellRenderer.propTypes = {
	data: PropTypes.shape({
		value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	}),
};
