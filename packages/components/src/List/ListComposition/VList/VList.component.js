import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import { ButtonIconFloating } from '@talend/design-system';

import { useListContext } from '../context';
import VirtualizedList from '../../../VirtualizedList';
import { DISPLAY_MODE, SORT } from '../constants';
import ColumnChooser from '../ColumnChooser';

import theme from '../List.scss';

const columnsFromChildrens = children => {
	return Array.isArray(children)
		? children.filter(column => !!column.props?.dataKey).map(column => column.props)
		: null;
};
function VList({ children, columnChooser, ...rest }) {
	const {
		displayMode = DISPLAY_MODE.TABLE,
		collection,
		visibleColumns,
		setSortParams,
		sortParams,
		setColumns,
		columns,
		setVisibleColumns,
	} = useListContext();

	// initialize visible columns
	if (!!setVisibleColumns && !visibleColumns) {
		const foundColumns = columnsFromChildrens(children);
		setVisibleColumns(map(foundColumns, 'dataKey'));
	}

	React.useEffect(() => {
		const nextColumns = columnsFromChildrens(children);
		if (nextColumns && !isEqual(map(nextColumns, 'dataKey'), map(columns, 'dataKey'))) {
			setColumns(nextColumns);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [children, setColumns]);

	const headerAction = !!columnChooser && displayMode === DISPLAY_MODE.TABLE && (
		<ColumnChooser {...columnChooser} buttonRenderer={ButtonIconFloating} />
	);

	return (
		<div className={theme.vlist}>
			<VirtualizedList
				collection={collection}
				type={displayMode.toUpperCase()}
				sortBy={get(sortParams, 'sortBy')}
				sortDirection={get(sortParams, 'isDescending') ? SORT.DESC : SORT.ASC}
				sort={({ sortBy, sortDirection }) =>
					setSortParams({ sortBy, isDescending: sortDirection === SORT.DESC })
				}
				headerAction={headerAction}
				{...rest}
			>
				{visibleColumns
					? children?.filter(column => visibleColumns?.includes(column.props?.dataKey))
					: children}
			</VirtualizedList>
		</div>
	);
}

VList.propTypes = {
	children: PropTypes.arrayOf(PropTypes.node),
	columnChooser: PropTypes.oneOfType([PropTypes.bool, ...ColumnChooser.propTypes]),
};

// we port the VirtualizedList columns to VList to allow VList.Title/Badge/...
Object.entries(VirtualizedList).forEach(([key, value]) => {
	VList[key] = value;
});
VList.displayName = 'VList';
export default VList;
