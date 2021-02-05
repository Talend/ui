import { useState, useMemo } from 'react';
import flow from 'lodash/flow';
import { compareOrder } from '../service';

const orderColumns = columns => {
	columns.sort(compareOrder).forEach((item, index) => {
		// eslint-disable-next-line no-param-reassign
		item.order = index + 1;
	});
	return columns;
};

const extractColumnValues = column => ({
	visible: !column.hidden,
	label: column.label,
	order: column.order,
	key: column.key,
	locked: column.locked,
});

/**
 * Add the attribute locked to the columns, depending of the value of lockedLeftItems.
 * @param {number} lockedLeftItems
 * @param {number} index
 */
const addColumnLockedAttr = (lockedLeftItems, index) => column => {
	if (index < lockedLeftItems) {
		return { ...column, locked: true };
	}
	return column;
};

/**
 * Set the visible attribute if is missing.
 * @param {object} column
 */
const addMissingVisibleAttr = column => {
	if (column.visible === undefined) {
		return { ...column, visible: false };
	}
	return column;
};

/**
 * Prepare the columns data for the column chooser hook.
 * @param {array} columns
 * @param {number} lockedLeftItems
 */
const prepareColumns = (columns, lockedLeftItems) => {
	const prepared = columns.map((column, index) =>
		flow([extractColumnValues, addMissingVisibleAttr, addColumnLockedAttr(lockedLeftItems, index)])(
			column,
		),
	);

	return orderColumns(prepared);
};

const updateVisibility = (column, visible) => {
	if (!column.locked) {
		return { ...column, visible };
	}
	return column;
};

/** *******************************************************************************
 * HOOK ENTRY POINT
 ******************************************************************************** */

/**
 * Manage the state of each row representing a column for the ColumnChooser overlay.
 * @param {array} initColumns
 * @param {number} nbLockedLeftItems
 */
export const useColumnChooserManager = (
	initialColumns = [],
	nbLockedLeftItems = 0,
	initialFilterValue = '',
) => {
	const [columns, setColumns] = useState(() => prepareColumns(initialColumns, nbLockedLeftItems));

	const [textFilter, setTextFilter] = useState(initialFilterValue);

	const filteredColumns = useMemo(
		() => columns.filter(column => column.label.toLowerCase().includes(textFilter.toLowerCase())),
		[columns, textFilter],
	);

	const onChangeVisibility = (value, label) => {
		const newColumns = columns.map(column => {
			if (column.label !== label) {
				return column;
			}

			return updateVisibility(column, value);
		});

		setColumns(newColumns);
	};

	const onSelectAll = value => {
		const newColumns = columns.map(column => {
			if (!filteredColumns.some(fColumn => fColumn.label === column.label)) {
				// Column is not part of the filtered columns, ignore it
				return column;
			}

			return updateVisibility(column, value);
		});

		setColumns(newColumns);
	};

	const selectAll = useMemo(() => {
		return filteredColumns.length > 0 && filteredColumns.every(column => column.visible);
	}, [filteredColumns]);

	return {
		onChangeVisibility,
		onSelectAll,
		columns,
		filteredColumns,
		selectAll,
		textFilter,
		setTextFilter,
	};
};
