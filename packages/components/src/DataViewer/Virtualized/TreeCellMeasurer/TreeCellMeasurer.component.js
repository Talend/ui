import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { CellMeasurer } from 'react-virtualized';

export default function TreeCellMeasurer({ index, parent, style, cellRenderer, className }) {
	return (
		<CellMeasurer
			cache={get(parent, 'props.cache')}
			columnIndex={0}
			parent={parent}
			rowIndex={index}
		>
			{({ measure }) => (
				<div className={className} style={{ ...style }}>
					{cellRenderer({ index, measure })}
				</div>
			)}
		</CellMeasurer>
	);
}

TreeCellMeasurer.propTypes = {
	cellRenderer: PropTypes.func.isRequired,
	className: PropTypes.string,
	index: PropTypes.number,
	parent: PropTypes.object,
	style: PropTypes.object,
};
