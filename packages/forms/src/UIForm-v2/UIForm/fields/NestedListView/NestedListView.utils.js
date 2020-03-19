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
	let textFilter;
	if (searchCriteria) {
		textFilter = ({ label }) => label.toLowerCase().includes(searchCriteria.toLowerCase());
	}

	return items
		.map(item => {
			const newChildren = item.children.map(child => ({
				...child,
				checked: (value[item.key] || []).includes(child.value),
			}));

			return {
				...item,
				checked: newChildren.some(child => child.checked),
				children: textFilter ? newChildren.filter(textFilter) : newChildren,
			};
		})
		.filter(hasChildren);
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
