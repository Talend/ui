import PropTypes from 'prop-types';
import React from 'react';
import memoizeOne from 'memoize-one';

import { listTypes } from './utils/constants';
import { rowDictionary } from './utils/dictionary';
import NoRows from './NoRows';
import ListTable from './ListTable';
import ListGrid from './ListGrid';
import propTypes from './PropTypes';
import Loader from '../Loader';
import { toColumns } from './utils/tablerow';

import tableTheme from './ListTable/ListTable.scss';

const getMemoizedToColumns = memoizeOne(toColumns);
const { TABLE } = listTypes;

/**
 * Select the ListGrid row renderer to use
 * @param type The row renderer type
 */
function getRowRenderer(type) {
	const rowRenderer = rowDictionary[type];
	if (!rowRenderer) {
		const rowRendererTypes = [TABLE].concat(Object.keys(rowDictionary));
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
			onRowClick,
			onRowDoubleClick,
			rowHeight,
			selectionToggle,
			sort,
			sortBy,
			sortDirection,
			type,
			width,
			disableHeader,
			inProgress,
		} = this.props;

		const collection = inProgress ? [] : this.props.collection;

		const commonProps = {
			collection,
			height,
			id,
			isActive,
			isSelected,
			noRowsRenderer: this.noRowsRenderer,
			onRowClick,
			onRowDoubleClick,
			rowHeight,
			selectionToggle,
			width,
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
			customProps = { rowRenderer: getRowRenderer(type) };
		}

		return (
			<ListRenderer {...commonProps} {...customProps}>
				{getMemoizedToColumns(id, tableTheme, children)}
			</ListRenderer>
		);
	}
}
RendererSelector.displayName = 'VirtualizedList(RendererSelector)';
RendererSelector.propTypes = {
	...propTypes,
	height: PropTypes.number,
	width: PropTypes.number,
};
RendererSelector.defaultProps = {
	noRowsRenderer: NoRows,
	type: TABLE,
};

export default RendererSelector;
