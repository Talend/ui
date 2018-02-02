import React from 'react';
import classNames from 'classnames';

import QualityBar from './quality-bar.component';
import theme from './header-grid.scss';

const TALEND_QUALITY_KEY = '@talend-quality@';
const TALEND_QUALITY_INVALID_KEY = -1;
const TALEND_QUALITY_EMPTY_KEY = 0;
const TALEND_QUALITY_VALID_KEY = 1;
export const HEADER_RENDERER_COMPONENT = 'headerGrid';
export default function CustomHeader(params) {
	return (
		<div className={classNames(theme['header-component'])}>
			<button
				className={classNames(theme.header)}
				onClick={() => params.onFocusedColumn(params.column.colId)}
			>
				<div className={classNames(theme['header-first-line'])}>
					<span className={classNames(theme['header-column-label'])} title={params.displayName}>
						{params.displayName}
					</span>
					<span className={classNames(theme['header-other-actions'])}>...</span>
				</div>
				<div className={classNames(theme['header-second-line'])}>{params.column.colDef.type}</div>
			</button>
			<QualityBar
				invalid={params.column.colDef[TALEND_QUALITY_KEY][TALEND_QUALITY_INVALID_KEY]}
				empty={params.column.colDef[TALEND_QUALITY_KEY][TALEND_QUALITY_EMPTY_KEY]}
				valid={params.column.colDef[TALEND_QUALITY_KEY][TALEND_QUALITY_VALID_KEY]}
			/>
		</div>
	);
}
