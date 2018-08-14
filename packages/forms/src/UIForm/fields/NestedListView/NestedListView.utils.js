/**
 * Build the ListView component props to match current state's values
 * @param {Array} items
 * @param {Object} value
 * @param {String} searchCriteria
 * @param {Array} toggledChildren
 * @returns {Object}
 */
export function getItemsProps(items, value, searchCriteria, toggledChildren) {
	const displayedItems = items.reduce((finalItems, item) => {
		const itemValue = value[item.key] || [];

		// Filter children items if search criteria has been provided
		const children = searchCriteria
<<<<<<< HEAD
			? item.children
				.filter(child => child.label.toLowerCase().includes(searchCriteria.toLowerCase()))
=======
			? item.children.filter(child =>
					child.label.toLowerCase().includes(searchCriteria.toLowerCase()),
			  )
>>>>>>> d5c19808d0118e242e992296c591652e66bd6c35
			: item.children;

		if (children.length > 0) {
			const checked =
				item.key in value && item.children.some(child => itemValue.includes(child.value));

			finalItems.push({
				...item,
				checked,
				expanded: toggledChildren.includes(item.toggleId),
				children: children.map(child => ({
					...child,
					checked: itemValue.includes(child.value),
				})),
			});
		}

		return finalItems;
	}, []);

	return {
		displayedItems,
		items,
		searchCriteria,
		toggledChildren,
	};
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
 * @returns { Object }
 */
export function initItems(schema, value, searchCriteria, toggledChildren, callbacks) {
	const { onExpandToggle, onParentChange, onCheck } = callbacks;

	const items = schema.items.map(item => {
		const key = item.key[1]; // This is ugly (get a parent "id")
		const toggleId = item.key.join('.'); // Build an internal id to manage toggling state

		return {
			label: item.title,
			isSwitchBox: false,
			key,
			toggleId,
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
		...getItemsProps(items, value, searchCriteria, toggledChildren),
		isSwitchBox: false,
		showToggleAll: false,
		emptyLabel: schema.emptyLabel,
		headerLabel: schema.title,
		noResultLabel: schema.noResultLabel,
		required: schema.required,
		searchPlaceholder: schema.placeholder,
	};
}
