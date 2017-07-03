import React, { PropTypes } from 'react';
import classNames from 'classnames';
import {
	extractSpecialFields,
	getId,
	getLabel,
	renderCell,
} from '../utils/gridrow';

import rowThemes from './RowThemes';
import theme from './RowLarge.scss';

/**
 * Row renderer that displays a Large item
 */
function RowLarge({ className, index, key, parent, style, isScrolling }) {
	const { titleField, selectionField, otherFields } = extractSpecialFields(parent);

	const parentId = getId(parent);
	const id = parentId && `${parentId}-${index}`;
	const titleCell = titleField && renderCell(index, parent, titleField);
	const selectionCell = selectionField && renderCell(index, parent, selectionField);
	const otherCellsListItems = otherFields.map((field, fieldIndex) => {
		const cellContent = renderCell(index, parent, field);
		const tooltip = typeof cellContent === 'string' ? cellContent : null;
		const label = getLabel(field);
		return (
			<li key={fieldIndex}>
				{label && (<span className={theme['field-label']}>{label}: </span>)}
				<span className={theme['field-value']} title={tooltip}>{cellContent}</span>
			</li>
		);
	});

	return (
		<div
			className={classNames(rowThemes)}
			key={key}
			style={style}
		>
			<div
				className={`tc-list-large-row ${theme['inner-box']} ${className}`}
				id={id}
			>
				{ !isScrolling &&
					<div>
						<div className={theme.header}>
							{titleCell}
							{selectionCell}
						</div>
						<ul className={theme.content}>
							{otherCellsListItems}
						</ul>
					</div>
				}
			</div>
		</div>
	);
}

RowLarge.displayName = 'VirtualizedList(RowLarge)';
RowLarge.propTypes = {
	/** Custom classname to set on the row */
	className: PropTypes.string,
	/** Row index */
	index: PropTypes.number,
	/** Row technical key to identify this row for React consolidation */
	key: PropTypes.string,
	/** Parent (ListGrid) component instance */
	parent: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	/** Custom style that react-virtualized provides */
	style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	/** row is scrolling */
	isScrolling: PropTypes.bool,
};

export default RowLarge;
