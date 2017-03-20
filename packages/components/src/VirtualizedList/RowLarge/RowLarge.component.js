import React, { PropTypes } from 'react';
import classNames from 'classnames';
import {
	extractTitle,
	getId,
	getLabel,
	renderCell,
} from '../utils/row';

import theme from './RowLarge.scss';

function RowLarge({ index, key, parent, style }) {
	const { titleField, otherFields } = extractTitle(parent);

	const parentId = getId(parent);
	const id = parentId && `${parentId}-${index}`;
	const titleCell = renderCell(index, parent, titleField);
	const otherCellsListItems = otherFields.map((field) => {
		const cellContent = renderCell(index, parent, field);
		const tooltip = typeof cellContent === 'string' ? cellContent : null;
		const label = getLabel(field);
		return (
			<li>
				{label && (<span className={theme['field-label']}>{label}: </span>)}
				<span className={theme['field-value']} title={tooltip}>{cellContent}</span>
			</li>
		);
	});

	return (
		<div
			className={theme['tc-list-large']}
			key={key}
			style={style}
		>
			<div
				className={classNames('tc-list-large-row', theme['inner-box'])}
				id={id}
			>
				{titleCell}
				<ul className={theme.content}>
					{otherCellsListItems}
				</ul>
			</div>
		</div>
	);
}

RowLarge.displayName = 'VirtualizedList(RowLarge)';
RowLarge.propTypes = {
	index: PropTypes.number,
	key: PropTypes.string,
	parent: PropTypes.arrayOf(PropTypes.element),
	style: PropTypes.object,
};

export default RowLarge;
