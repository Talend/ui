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

export default function DefaultHeaderRenderer(props) {
	return (
		<div className={classNames(theme['td-header-component'], 'td-header-component')}>
			<button
				className={classNames(theme.header)}
				onClick={() => props.onFocusedColumn(props.column.colId)}
			>
				<div className={classNames(theme['header-first-line'])}>
					<span className={classNames(theme['header-column-label'])} title={props.displayName}>
						{props.displayName}
					</span>
					<span className={classNames(theme['header-other-actions'])}>...</span>
				</div>
				<div className={classNames(theme['header-second-line'])}>{props.column.colDef.type}</div>
			</button>
			{props.column.colDef[TALEND_QUALITY_KEY] && (
				<QualityBar
					invalid={props.column.colDef[TALEND_QUALITY_KEY][TALEND_QUALITY_INVALID_KEY]}
					empty={props.column.colDef[TALEND_QUALITY_KEY][TALEND_QUALITY_EMPTY_KEY]}
					valid={props.column.colDef[TALEND_QUALITY_KEY][TALEND_QUALITY_VALID_KEY]}
				/>
			)}
		</div>
	);
}
