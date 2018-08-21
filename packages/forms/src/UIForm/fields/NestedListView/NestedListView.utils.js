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
 * Define the items from schema, and init the items related state
 * @param { Object } schema The merged schema
 * @param { Array } value the listView value
 * @param { string } searchCriteria The filter criteria
 * @param { Object } callbacks
 * @param { Function } callbacks.onExpandToggle
 * @param { Function } callbacks.onParentChange
 * @param { Function } callbacks.onCheck
 * @returns { Array }
 */
export function initItems(schema, value, searchCriteria, callbacks) {
	const { onExpandToggle, onParentChange, onCheck } = callbacks;

	const items = schema.items.map(item => {
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

	return {
		items,
		displayedItems: getDisplayedItems(items, value, searchCriteria),
	};
}
