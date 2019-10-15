import PropTypes from 'prop-types';
import React from 'react';

import { listTypes } from './utils/constants';
import { rowDictionary } from './utils/dictionary';
import NoRows from './NoRows';
import ListTable from './ListTable';
import ListGrid from './ListGrid';
import propTypes from './PropTypes';
import Loader from '../Loader';

const { TABLE } = listTypes;

/**
 * Select the ListGrid row renderer to use
 * @param type The row renderer type
 */
function getRowRenderer(type, renderers = {}) {
	const safeRenderer = { ...rowDictionary, ...renderers };
	const rowRenderer = safeRenderer[type];
	if (!rowRenderer) {
		const rowRendererTypes = [TABLE].concat(Object.keys(safeRenderer));
		throw new Error(
			`Unknown row renderer in Virtualized List : ${type}. ` +
				`Possible values are [${rowRendererTypes}].`,
		);
	}
	return rowRenderer;
}

/**
 * Component that maps list types to the corresponding component
 */
class RendererSelector extends React.Component {
	constructor(props) {
		super(props);
		this.noRowsRenderer = this.noRowsRenderer.bind(this);
	}

	noRowsRenderer() {
		if (this.props.inProgress) {
			return <Loader className={'tc-virtualizedlist-no-result'} />;
		}
		const NoRowsRenderer = this.props.noRowsRenderer;
		return <NoRowsRenderer />;
	}

	render() {
		const {
			children,
			height,
			id,
			isSelected,
			isActive,
			getRowState,
			onRowClick,
			onRowDoubleClick,
			onScroll,
			rowHeight,
			sort,
			sortBy,
			sortDirection,
			type,
			width,
			disableHeader,
			inProgress,
			rowRenderers,
			rowCount,
			onRowsRendered,
			registerChild,
			scrollToIndex,
		} = this.props;

		const collection = inProgress ? [] : this.props.collection;
		const commonProps = {
			children,
			collection,
			height,
			id,
			isActive,
			getRowState,
			isSelected,
			noRowsRenderer: this.noRowsRenderer,
			onRowClick,
			onRowDoubleClick,
			onScroll,
			rowCount,
			rowHeight,
			width,
			onRowsRendered,
			registerChild,
			scrollToIndex,
		};

		let ListRenderer;
		let customProps;

		if (type === TABLE) {
			ListRenderer = ListTable;
			customProps = {
				disableHeader,
				sort,
				sortBy,
				sortDirection,
			};
		} else {
			ListRenderer = ListGrid;
			const rowRenderer = getRowRenderer(type, rowRenderers);
			const options = rowRenderer.options || {};
			customProps = { rowRenderer, ...options };
		}

		return <ListRenderer {...commonProps} {...customProps} />;
	}
}

RendererSelector.displayName = 'VirtualizedList(RendererSelector)';
RendererSelector.propTypes = {
	...propTypes,
	height: PropTypes.number,
	width: PropTypes.number,
	rowRenderers: PropTypes.object,
};
RendererSelector.defaultProps = {
	noRowsRenderer: NoRows,
	type: TABLE,
};

export default RendererSelector;
