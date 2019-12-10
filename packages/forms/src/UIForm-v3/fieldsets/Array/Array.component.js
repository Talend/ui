import React, { useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Items from './Items.component';
import ItemsTemplate from './templates/ItemsTemplate.component';
import AddButton from './buttons/AddButton.component';
import DeleteButton from './buttons/DeleteButton.component';
import MoveUpButton from './buttons/MoveUpButton.component';
import MoveDownButton from './buttons/MoveDownButton.component';

import FieldsetTemplate from '../../templates/FieldsetTemplate';

import ArrayContext from './context';

export default function ArrayFieldset(props) {
	const { children, initialNbItems = 0, name, registerOptions, rhf, ...restProps } = props;
	const { errors, getValues, setValue, register, unregister } = rhf;

	const [nbItems, setNbItems] = useState(() => {
		const items = getValues({ nest: true })[name];
		return items ? items.length : initialNbItems;
	});

	React.useEffect(() => {
		register({ name }, registerOptions);
		return () => unregister(name);
	}, [register, unregister, name]);

	React.useEffect(() => {
		console.log('getValues changed', getValues(), getValues({ nest: true }));
	}, [getValues]);

	const getItems = () => {
		const items = getValues({ nest: true })[name];
		return items ? [...items] : [];
	};

	function refreshItems(newItems, fromIndex, toIndex /* excluded */) {
		setValue(name, newItems, true);

		if (fromIndex !== undefined && toIndex !== undefined) {
			const values = getValues();
			const copyValue = key => {
				setValue(key, get(newItems, key.substr(name.length)), true);
			};
			// eslint-disable-next-line no-plusplus
			for (let i = fromIndex; i < toIndex; i++) {
				const itemKey = `${name}[${i}]`;
				Object.keys(values)
					.filter(key => key.startsWith(itemKey))
					.forEach(copyValue);
			}
		}
	}

	function addItem() {
		const newItems = getItems().concat(null);
		refreshItems(newItems);
		setNbItems(nbItems + 1);
	}

	function deleteItem(index) {
		const newItems = getItems();
		newItems.splice(index, 1);
		refreshItems(newItems, index, newItems.length);
		setNbItems(newItems.length);
	}

	function swapItems(lowIndex, highIndex) {
		const newItems = getItems();
		[newItems[lowIndex], newItems[highIndex]] = [newItems[highIndex], newItems[lowIndex]];

		refreshItems(newItems, lowIndex, highIndex + 1);
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
			<FieldsetTemplate {...restProps} error={errors[name]}>
				{children}
			</FieldsetTemplate>
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
		...FieldsetTemplate.propTypes,
		children: PropTypes.node,
		id: PropTypes.string.isRequired,
		initialNbItems: PropTypes.number,
		name: PropTypes.string.isRequired,
		registerOptions: PropTypes.object,
		rhf: PropTypes.object.isRequired,
	};
}
