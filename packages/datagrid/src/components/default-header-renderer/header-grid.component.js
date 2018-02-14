import React from 'react';
import classNames from 'classnames';

import QualityBar from './quality-bar.component';
import theme from './header-grid.scss';
import {
	TALEND_QUALITY_KEY,
	TALEND_QUALITY_INVALID_KEY,
	TALEND_QUALITY_EMPTY_KEY,
	TALEND_QUALITY_VALID_KEY,
} from '../constants';

export const HEADER_RENDERER_COMPONENT = 'headerGrid';

export default function DefaultHeaderRenderer(params) {
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
			{params.column.colDef[TALEND_QUALITY_KEY] && (
				<QualityBar
					invalid={params.column.colDef[TALEND_QUALITY_KEY][TALEND_QUALITY_INVALID_KEY]}
					empty={params.column.colDef[TALEND_QUALITY_KEY][TALEND_QUALITY_EMPTY_KEY]}
					valid={params.column.colDef[TALEND_QUALITY_KEY][TALEND_QUALITY_VALID_KEY]}
				/>
			)}
		</div>
	);
}
