import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Items from './Items.component';
import ItemsTemplate from './templates/ItemsTemplate.component';
import AddButton from './buttons/AddButton.component';
import DeleteButton from './buttons/DeleteButton.component';
import MoveUpButton from './buttons/MoveUpButton.component';
import MoveDownButton from './buttons/MoveDownButton.component';

import Fieldset from '../Fieldset';
import ArrayContext from './context';

export default function ArrayFieldset(props) {
	const { children, initialNbItems = 0, name, rhf, ...restProps } = props;
	const { getValues, setValue } = rhf;

	const [nbItems, setNbItems] = useState(() => {
		const values = getValues({ nest: true })[name];
		return values ? values.length : initialNbItems;
	});

	function addItem() {
		setNbItems(nbItems + 1);
	}

	function refreshItems(arrayValues, fromIndex, toIndex /* excluded */) {
		const values = getValues();
		const copyValue = key => setValue(key, get(arrayValues, key.substr(name.length)));

		// eslint-disable-next-line no-plusplus
		for (let i = fromIndex; i < toIndex; i++) {
			const itemKey = `${name}[${i}]`;
			Object.keys(values)
				.filter(key => key.startsWith(itemKey))
				.forEach(copyValue);
		}
	}

	function deleteItem(index) {
		const arrayValues = getValues({ nest: true })[name];
		arrayValues.splice(index, 1);
		refreshItems(arrayValues, index, nbItems - 1);
		setNbItems(nbItems - 1);
	}

	function swapItems(lowIndex, highIndex) {
		const arrayValues = getValues({ nest: true })[name];
		[arrayValues[lowIndex], arrayValues[highIndex]] = [
			arrayValues[highIndex],
			arrayValues[lowIndex],
		];

		refreshItems(arrayValues, lowIndex, highIndex + 1);
	}

	function moveItemDown(index) {
		if (index === nbItems - 1) {
			return;
		}
		swapItems(index, index + 1);
	}

	function moveItemUp(index) {
		if (index === 0) {
			return;
		}
		swapItems(index - 1, index);
	}

	return (
		<ArrayContext.Provider value={{ nbItems, addItem, deleteItem, moveItemDown, moveItemUp }}>
			<Fieldset {...restProps}>{children}</Fieldset>
		</ArrayContext.Provider>
	);
}
ArrayFieldset.Items = Items;
ArrayFieldset.ItemsTemplate = ItemsTemplate;
ArrayFieldset.AddButton = AddButton;
ArrayFieldset.DeleteButton = DeleteButton;
ArrayFieldset.MoveUpButton = MoveUpButton;
ArrayFieldset.MoveDownButton = MoveDownButton;

if (process.env.NODE_ENV !== 'production') {
	ArrayFieldset.propTypes = {
		children: PropTypes.node,
		initialNbItems: PropTypes.number,
		name: PropTypes.string.isRequired,
		rhf: PropTypes.object.isRequired,
	};
}
