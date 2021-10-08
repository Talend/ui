import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import QualityBar, { QUALITY_PROPTYPE } from './QualityBar.component';
import theme from './DefaultHeaderRenderer.scss';
import {
	QUALITY_KEY,
	QUALITY_INVALID_KEY,
	QUALITY_EMPTY_KEY,
	QUALITY_VALID_KEY,
} from '../../constants';

export const HEADER_RENDERER_COMPONENT = 'headerGrid';

export default function DefaultHeaderRenderer({ column, displayName, onFocusedColumn, onKeyDown }) {
	const onHeaderClick = () => onFocusedColumn(column.colId);
	const onHeaderKeyDown = event => onKeyDown(event, column.colId);

	return (
		<div className={classNames(theme['td-header-component'], 'td-header-component')}>
			<button
				className={classNames(theme['td-header'], 'td-header')}
				onClick={onHeaderClick}
				onKeyDown={onHeaderKeyDown}
				type="button"
			>
				<span>
					<div className={classNames(theme['td-header-title'], 'td-header-title')}>
						<span
							className={classNames(theme['td-header-title-ellipse'], 'td-header-title-ellipse')}
							title={displayName}
						>
							{displayName}
						</span>
					</div>
					<div
						className={classNames(theme['td-header-type'], 'td-header-type')}
						title={column.colDef.type}
					>
						{column.colDef.type}
					</div>
				</span>
			</button>
			{column.colDef[QUALITY_KEY] && (
				<QualityBar
					invalid={column.colDef[QUALITY_KEY][QUALITY_INVALID_KEY]}
					empty={column.colDef[QUALITY_KEY][QUALITY_EMPTY_KEY]}
					valid={column.colDef[QUALITY_KEY][QUALITY_VALID_KEY]}
				/>
			)}
		</div>
	);
}

DefaultHeaderRenderer.propTypes = {
	column: PropTypes.shape({
		colDef: PropTypes.shape({
			[QUALITY_KEY]: PropTypes.shape({
				[QUALITY_EMPTY_KEY]: PropTypes.shape(QUALITY_PROPTYPE),
				[QUALITY_INVALID_KEY]: PropTypes.shape(QUALITY_PROPTYPE),
				[QUALITY_VALID_KEY]: PropTypes.shape(QUALITY_PROPTYPE),
			}),
			type: PropTypes.string,
		}),
		colId: PropTypes.string,
	}),
	displayName: PropTypes.string,
	onFocusedColumn: PropTypes.func,
	onKeyDown: PropTypes.func,
};
