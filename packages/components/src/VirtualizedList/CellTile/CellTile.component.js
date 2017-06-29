import React, { PropTypes } from 'react';
import classNames from 'classnames';

import {
	extractSpecialFields,
	getId,
	getLabel,
	renderCell,
	getCellRenderer,
} from '../utils/gridrow';

import CellActions from '../CellActions';
import cellThemes from './CellThemes';
import theme from './CellTile.scss';

/**
 * Render a tile
 */

function CellTile({ className, index, key, parent, style }) {
	const { titleField, selectionField, otherFields } = extractSpecialFields(parent);

	const parentId = getId(parent);
	const id = parentId && `${parentId}-${index}`;
	const titleCell = titleField && renderCell(index, parent, titleField);
	const selectionCell = selectionField && renderCell(index, parent, selectionField);
	const otherCellsListItems = otherFields.map((field, fieldIndex) => {
		const cellContent = renderCell(index, parent, field);
		const tooltip = typeof cellContent === 'string' ? cellContent : null;
		const label = getLabel(field);
		return [
			(<dt className={theme.itemtitle}>{label}</dt>),
			(<dd title={cellContent} className={theme.itemvalue}>{cellContent}</dd>),
		];
	});

	return (
		<div className={'tc-list-tile-wrapper'}>
			<div
				className={classNames(cellThemes)}
				key={key}
				style={style}
			>
				{titleCell}{selectionCell}
				<dl className={theme.itemlist}>
				{otherCellsListItems}
				</dl>
			</div>
		</div>
	);
}

CellTile.displayName = 'VirtualizedList(CellTile)';
CellTile.propTypes = {
	/** Custom classname to set on the row */
	className: PropTypes.string,
	/** Cell index */
	index: PropTypes.number,
	/** Cell technical key to identify this row for React consolidation */
	key: PropTypes.string,
	/** Parent (ListGrid) component instance */
	parent: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	/** Custom style that react-virtualized provides */
	style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default CellTile;
