/* eslint-disable consistent-return */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import get from 'lodash/get';
import ArrayFieldset from '../../../../widgets/fieldsets/Array';

export default function RHFArrayFieldset(props) {
	const { initialNbItems = 0, name, rules, ...restProps } = props;
	const { errors, getValues, setValue, register, unregister } = useFormContext();

	const [nbItems, setNbItems] = useState(() => {
		const items = getValues({ nest: true })[name];
		return items ? items.length : initialNbItems;
	});

	const hasRules = !!rules;
	const lengthName = `${name}[].length`;

	// when there are rules, we register the array length
	// to enable the array validation based on its length
	React.useEffect(() => {
		if (!hasRules) {
			return;
		}

		register({ name: lengthName, type: 'custom', value: nbItems }, rules);
		return () => unregister(lengthName);
	}, [hasRules, lengthName, register, unregister]);

	// if we registered the array length in RHF, on element add/remove,
	// we update the length to trigger validation
	React.useEffect(() => {
		if (!hasRules) {
			return;
		}

		setValue(lengthName, nbItems, true);
	}, [hasRules, lengthName, nbItems]);

	const getItems = () => {
		const items = getValues({ nest: true })[name];
		return items ? [...items] : [];
	};

	function refreshItems(newItems, fromIndex, toIndex /* excluded */) {
		if (fromIndex === undefined || toIndex === undefined || fromIndex >= toIndex) {
			return;
		}
		const values = getValues();
		// eslint-disable-next-line no-plusplus
		for (let i = fromIndex; i < toIndex; i++) {
			const itemKeyPattern = `^${name}(\\[${i}\\])(\\.(.+))?$`;

			Object.keys(values)
				.map(key => key.match(itemKeyPattern))
				.filter(Boolean)
				.forEach(matchGroup => {
					const path = `[${i}]${matchGroup[2] || ''}`;
					setValue(matchGroup.input, get(newItems, path), true);
				});
		}
	}

	function onAdd() {
		setNbItems(nbItems + 1);
	}

	function onRemove(index) {
		const newItems = getItems();
		newItems.splice(index, 1);
		refreshItems(newItems, index, nbItems);
		setNbItems(nbItems - 1);
	}

	function onMove(lowIndex, highIndex) {
		const newItems = getItems();
		[newItems[lowIndex], newItems[highIndex]] = [newItems[highIndex], newItems[lowIndex]];

		refreshItems(newItems, lowIndex, highIndex + 1);
	}

	return (
		<ArrayFieldset
			{...restProps}
			error={get(errors, lengthName)?.message}
			nbItems={nbItems}
			onAdd={onAdd}
			onMove={onMove}
			onRemove={onRemove}
		/>
	);
}
RHFArrayFieldset.Items = ArrayFieldset.Items;
RHFArrayFieldset.ItemsTemplate = ArrayFieldset.ItemsTemplate;
RHFArrayFieldset.AddButton = ArrayFieldset.AddButton;
RHFArrayFieldset.DeleteButton = ArrayFieldset.DeleteButton;
RHFArrayFieldset.MoveUpButton = ArrayFieldset.MoveUpButton;
RHFArrayFieldset.MoveDownButton = ArrayFieldset.MoveDownButton;

if (process.env.NODE_ENV !== 'production') {
	RHFArrayFieldset.propTypes = {
		children: PropTypes.node,
		id: PropTypes.string.isRequired,
		initialNbItems: PropTypes.number,
		name: PropTypes.string.isRequired,
		rules: PropTypes.object,
	};
}
