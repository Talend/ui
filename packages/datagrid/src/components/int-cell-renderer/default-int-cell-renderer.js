import React from 'react';
import classNames from 'classnames';

import theme from './default-int-cell.scss';

export default function DefaultIntCellRenderer({ data }) {
	return <div className={classNames(theme['td-cell-int'], 'td-cell-int')}>{data.value}</div>;
}
