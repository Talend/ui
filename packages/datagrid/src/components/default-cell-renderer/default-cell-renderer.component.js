import React from 'react';
import classNames from 'classnames';

import QualityIndicator from './quality-indicator.component';
import theme from './default-cell-renderer.scss';

export const CELL_RENDERER_COMPONENT = 'cellRenderer';

export default function DefaultCellRenderer({ colDef, column, value }) {
	if (column.pinned) {
		return <div>{value}</div>;
	}
	return (
		<div
			className={classNames(theme.cell, {
				[theme['cell-number']]: value.type === 'number',
			})}
		>
			{value.qualityIndicator <= 0 && <QualityIndicator tooltip="Incorrect value" />}
			{value.type === 'string' && <span className={classNames(theme['invisible-char'])} />}
			<span>{value.value}</span>
			{value.type === 'string' && <span className={classNames(theme['invisible-char'])} />}
		</div>
	);
}
