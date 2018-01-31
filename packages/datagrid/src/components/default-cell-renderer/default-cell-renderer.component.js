import React from 'react';
import classNames from 'classnames';

import QualityIndicator from './quality-indicator.component';
import theme from './default-cell-renderer.scss';

export const CELL_RENDERER_COMPONENT = 'cellRenderer';

export default function DefaultCellRenderer({ value }) {
	return (
		<div
			className={classNames(theme.cell, {
				[theme['cell-number']]: value.type === 'number',
			})}
		>
			{value.quality <= 0 && <QualityIndicator tooltip="Incorrect value" />}
			{value.type === 'string' && <span className={classNames(theme['invisible-char'])} />}
			<span>{value.value}</span>
			{value.type === 'string' && <span className={classNames(theme['invisible-char'])} />}
		</div>
	);
}
