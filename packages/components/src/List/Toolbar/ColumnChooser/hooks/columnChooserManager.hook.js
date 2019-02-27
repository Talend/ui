import { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import flow from 'lodash/flow';
import { compareOrder } from '../service';

function matchOrder(value) {
	return function match({ order }) {
		return order === value;
	};
}

function getItemOrder(order, index, length) {
	if (index === length - 1) {
		return order - 1;
	}
	return order + 1;
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

export function useColumnChooserManager(columns, customSubmit) {
	const [state, setState] = useState({
		editedColumns: organiseEditedColumns(cloneDeep(columns)),
		selectAll: false,
	});

	function getEditedColumnsLength() {
		return state.editedColumns.length;
	}

	function modifyOrderTwoItems(value, index) {
		const indexToReplace = state.editedColumns.findIndex(matchOrder(value));
		const orderToReplace = getItemOrder(value, indexToReplace, getEditedColumnsLength());
		if (indexToReplace > -1 && !state.editedColumns[indexToReplace].locked) {
			flow([
				updateAttributeOrder(orderToReplace, indexToReplace),
				updateAttributeOrder(value, index),
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
			modifyOrderTwoItems(value, index);
		};
	}

	function onKeyPressInputTextOrder(index) {
		return function onKeyPress(event, value) {
			modifyOrderTwoItems(value, index);
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
