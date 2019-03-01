import { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import flow from 'lodash/flow';
import { compareOrder } from '../service';

function matchOrder(value) {
	return function match({ order }) {
		return order === value;
	};
}

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
const updateAttributeOrder = changeAttribute('order');

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

function modifyOrderItem(currentOrder, it, indexCurrent, replaceIndex, newOrder) {
	if (it === indexCurrent) {
		return updateAttributeOrder(newOrder);
	}
	if (indexCurrent < it && it <= replaceIndex) {
		return updateAttributeOrder(currentOrder - 1);
	}
	if (indexCurrent > it && it >= replaceIndex) {
		return updateAttributeOrder(currentOrder + 1);
	}
	return updateAttributeOrder(currentOrder);
}

function modifyOrderItems(currentIndex, replaceIndex, order) {
	return function modifyOrderCollection(collection) {
		collection.forEach((item, it) => {
			modifyOrderItem(item.order, it, currentIndex, replaceIndex, order)(item);
		});
		return collection;
	};
}

export function useColumnChooserManager(columns, customSubmit, lockedLeftItems) {
	const [state, setState] = useState({
		editedColumns: organiseEditedColumns(checkLockedItem(columns, lockedLeftItems)),
		selectAll: false,
	});

	function modifyOrders(order, currentIndex) {
		const replaceIndex = state.editedColumns.findIndex(matchOrder(order));
		if (replaceIndex > -1 && !state.editedColumns[replaceIndex].locked) {
			flow([
				modifyOrderItems(currentIndex, replaceIndex, order),
				organiseEditedColumns,
				updateEditedColumns,
				setState,
			])(state.editedColumns);
		}
	}

	function onChangeVisibility(index) {
		return function changeVisiblity(event, value) {
			flow([updateAttributeVisiblity(value, index), updateEditedColumns, setState])(
				state.editedColumns,
			);
		};
	}

	function onBlurInputTextOrder(index) {
		return function onBlur(event, value) {
			modifyOrders(value, index);
		};
	}

	function onKeyPressInputTextOrder(index) {
		return function onKeyPress(event, value) {
			modifyOrders(value, index);
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
		onBlurInputTextOrder,
		onChangeVisibility,
		onKeyPressInputTextOrder,
		onSelectAll,
		onSubmitColumnChooser,
		stateColumnChooser: Object.freeze(state),
	};
}
