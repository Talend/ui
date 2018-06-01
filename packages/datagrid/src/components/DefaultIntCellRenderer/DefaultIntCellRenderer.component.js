import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DefaultValueRenderer from '../DefaultCellRenderer/DefaultValueRenderer.component';
import theme from './DefaultIntCell.scss';

export default function DefaultIntCellRenderer({ data }) {
	return (
		<DefaultValueRenderer
			className={classNames(theme['td-cell-int'], 'td-cell-int')}
			label={data.value}
		/>
	);
}

DefaultIntCellRenderer.propTypes = {
	data: PropTypes.shape({
		value: PropTypes.string,
	}),
};
