/**
 * Check if an item as children, use as filter
 * @param {Object} item
 * @returns {Boolean}
 */
function hasChildren(item) {
	return item.children.length > 0;
}

/**
 * Build the ListView component props to match current state's values
 * @param {Array} items
 * @param {Object} value
 * @param {String} searchCriteria
 * @returns {Array}
 */
export function getDisplayedItems(items, value, searchCriteria) {
	const textCriteria = searchCriteria ? searchCriteria.toLowerCase() : '';

	const checkedItems = items
		.reduce((acc, item) => {
			const newChildren = item.children.map(child => ({
				...child,
				checked: (value[item.key] || []).includes(child.value),
			}));
			return [
				...acc,
				{ ...item, checked: newChildren.some(child => child.checked), children: newChildren },
			];
		}, [])
		.filter(hasChildren);

	return checkedItems.reduce((filtered, item) => {
		if (item.label.toLowerCase().includes(textCriteria)) {
			return [...filtered, item];
		}

		const filteredChildren = item.children.filter(child =>
			child.label.toLowerCase().includes(textCriteria),
		);

		return filteredChildren.length > 0
			? [...filtered, { ...item, children: filteredChildren }]
			: filtered;
	}, []);
}

/**
 * Prepare items from schema to be used within ListView
 * @param {Object} schema
 * @param {Object} callbacks
 * @param {Function} callbacks.onExpandToggle
 * @param {Function} callbacks.onParentChange
 * @param {Function} callbacks.onCheck
 * @returns {Array}
 */
export function prepareItemsFromSchema(schema, callbacks) {
	const { onExpandToggle, onParentChange, onCheck } = callbacks;

	return schema.items.map(item => {
		const key = item.key[item.key.length - 1];

		return {
			label: item.title,
			expanded: false,
			key,
			onExpandToggle,
			onChange: onParentChange,
			children: item.titleMap.map(option => ({
				label: option.name,
				value: option.value,
				onChange: onCheck,
			})),
		};
	});
}
