import { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import flow from 'lodash/flow';
import { compareOrder } from '../service';

function updateEditedColumns(editedColumns) {
	return function updateState(state) {
		return {
			...state,
			editedColumns,
		};
	};
}

export function organiseEditedColumns(collection) {
	collection.sort(compareOrder).forEach((item, index) => {
		// eslint-disable-next-line no-param-reassign
		item.order = index + 1;
	});
	return collection;
}

export function changeAttribute(key) {
	return function updateAttribute(value, index = -1) {
		if (index > -1) {
			return function setAttributeInCollection(collection) {
				if (!collection[index].locked) {
					// eslint-disable-next-line no-param-reassign
					collection[index][key] = value;
				}
				return collection;
			};
		}
		return function setAttributeInColumn(column) {
			if (!column.locked) {
				// eslint-disable-next-line no-param-reassign
				column[key] = value;
			}
			return column;
		};
	};
}

const updateAttributeVisiblity = changeAttribute('hidden');

function extractItemValues(item) {
	return {
		label: item.label,
		order: item.order,
		hidden: item.hidden,
	};
}

function checkLockedItem(items, lockedLeftItems) {
	return items.map((item, it) => {
		// eslint-disable-next-line no-console
		console.warn(`This item is locked ${item}: use the lockedItems props to lock item`);
		if (it < lockedLeftItems) {
			return { ...extractItemValues(item), locked: true };
		}
		return extractItemValues(item);
	});
}

function checkVisibility(items) {
	const hiddenItems = items.filter(item => !item.hidden || item.locked);
	if (hiddenItems) {
		return hiddenItems.length === items.length;
	}
	return false;
}

export function useColumnChooserManager(columns, customSubmit, lockedLeftItems) {
	const sanitizeItems = checkLockedItem(columns, lockedLeftItems);
	const [state, setState] = useState({
		editedColumns: organiseEditedColumns(sanitizeItems),
		selectAll: checkVisibility(sanitizeItems),
	});

	function onChangeVisibility(index) {
		return function changeVisiblity(event, value) {
			flow([updateAttributeVisiblity(value, index), updateEditedColumns, setState])(
				state.editedColumns,
			);
		};
	}

	function onSelectAll(event, value) {
		state.editedColumns.forEach(updateAttributeVisiblity(!value));
		setState({
			...state,
			editedColumns: state.editedColumns,
			selectAll: value,
		});
	}

	function onSubmitColumnChooser(event) {
		customSubmit(event, cloneDeep(state.editedColumns));
	}

	return {
		onChangeVisibility,
		onSelectAll,
		onSubmitColumnChooser,
		stateColumnChooser: Object.freeze(state),
	};
}
