import React from 'react';
import classNames from 'classnames';

import QualityBar from './quality-bar.component';
import theme from './header-grid.scss';

export const HEADER_RENDERER_COMPONENT = 'headerGrid';

export default function CustomHeader(params) {
	return (
		<div
			className={classNames(theme['header-component'])}
			onClick={() => params.onFocusedColumn(params.column.colId)}
		>
			<button className={classNames(theme.header)}>
				<div className={classNames(theme['header-first-line'])}>
					<span className={classNames(theme['header-column-label'])}>{params.displayName}</span>
					<span className={classNames(theme['header-other-actions'])}>...</span>
				</div>
				<div className={classNames(theme['header-second-line'])}>type</div>
			</button>
			<QualityBar invalid={33} empty={33} valid={34} />
		</div>
	);
}
