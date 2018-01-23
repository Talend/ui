import React from 'react';
import classNames from 'classnames';

import QualityIndicator from './quality-indicator.component';

import theme from './cell-renderer.scss';

export default function CustomHeader(params) {
	return (
		<div
			className={classNames(theme.cell, {
				[theme['cell-number']]: params.value.type === 'number',
			})}
		>
			{params.value.qualityIndicator <= 0 && <QualityIndicator tooltip="Incorrect value" />}
			{params.value.type === 'string' && <span className={classNames(theme['invisible-char'])} />}
			<span>{params.value.value}</span>
			{params.value.type === 'string' && <span className={classNames(theme['invisible-char'])} />}
		</div>
	);
}
