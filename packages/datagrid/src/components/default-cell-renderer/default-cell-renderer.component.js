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
			{value.quality <= 0 && <QualityIndicator tooltip="Incorrect value" value={value.quality} />}
			<span>{value.value}</span>
		</div>
	);
}
