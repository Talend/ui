import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import QualityBar from './QualityBar.component';
import theme from './DefaultHeaderRenderer.scss';
import {
	TALEND_QUALITY_KEY,
	TALEND_QUALITY_INVALID_KEY,
	TALEND_QUALITY_EMPTY_KEY,
	TALEND_QUALITY_VALID_KEY,
} from '../constants';

export const HEADER_RENDERER_COMPONENT = 'headerGrid';

export default function DefaultHeaderRenderer({ column, displayName, onFocusedColumn }) {
	return (
		<div className={classNames(theme['td-header-component'], 'td-header-component')}>
			<button
				className={classNames(theme['td-header'], 'td-header')}
				onClick={() => onFocusedColumn(column.colId)}
			>
				<div className={classNames(theme['td-header-first-line'], 'td-header-first-line')}>
					<span
						className={classNames(theme['td-header-column-label'], 'td-header-column-label')}
						title={displayName}
					>
						{displayName}
					</span>
					<span>...</span>
				</div>
				<div>{column.colDef.type}</div>
			</button>
			{column.colDef[TALEND_QUALITY_KEY] && (
				<QualityBar
					invalid={column.colDef[TALEND_QUALITY_KEY][TALEND_QUALITY_INVALID_KEY]}
					empty={column.colDef[TALEND_QUALITY_KEY][TALEND_QUALITY_EMPTY_KEY]}
					valid={column.colDef[TALEND_QUALITY_KEY][TALEND_QUALITY_VALID_KEY]}
				/>
			)}
		</div>
	);
}

DefaultHeaderRenderer.propTypes = {
	column: PropTypes.shape({
		colDef: PropTypes.shape({
			[TALEND_QUALITY_KEY]: PropTypes.shape({
				[TALEND_QUALITY_EMPTY_KEY]: PropTypes.number,
				[TALEND_QUALITY_INVALID_KEY]: PropTypes.number,
				[TALEND_QUALITY_VALID_KEY]: PropTypes.number,
			}),
		}),
	}),
	displayName: PropTypes.string,
	onFocusedColumn: PropTypes.func,
};
