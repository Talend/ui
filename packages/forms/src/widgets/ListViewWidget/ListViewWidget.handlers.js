import keycode from 'keycode';

const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
const LISTVIEW_SEARCH_ACTION = 'LISTVIEW_SEARCH_ACTION';

export function onSearchHandler() {
	this.setState(prevState => ({
		headerInput: this.searchInputsActions,
		searchCriteria: prevState.loadingSearchCriteria,
		loadingSearchCriteria: '',
	}));
}

export function onInputChange(event, value) {
	if (this.timerSearch !== null) {
		clearTimeout(this.timerSearch);
	}
	this.timerSearch = setTimeout(() => {
		this.timerSearch = null;
		if (
			this.callActionHandler(
				LISTVIEW_SEARCH_ACTION,
				value.value,
				onSearchHandler.bind(this),
			)
		) {
			this.setState({
				loadingSearchCriteria: value.value,
				headerInput: this.loadingInputsActions,
			});
		} else {
			const searchCriteria = value.value;
			this.setState(prevState => {
				const newDisplayedItems = prevState.items.filter(item =>
					item.label
						.toLowerCase()
						.includes(searchCriteria.toLowerCase()),
				);
				const toggleAllChecked =
					!!newDisplayedItems.length &&
					newDisplayedItems.length ===
						newDisplayedItems.filter(i => i.checked).length;
				return {
					toggleAllChecked,
					searchCriteria,
					displayedItems: newDisplayedItems,
				};
			});
		}
	}, 400);
}

export function onToggleAll() {
	this.setState(prevState => {const checked = !prevState.toggleAllChecked;
	const {items , displayedItems }= prevState;
	const newItems = items.map((item) => {
		const displayedItem = displayedItems.find(i => i.index === item.index,
		);if (displayedItem) {
			return {
				...displayedItem,
				checked,
			};
		}
		return item;
	});
	const newDisplayedItems = prevState.displayedItems.map(displayedItem => ({

			...displayedItem,
			checked,
		}),
	);
	return{
		toggleAllChecked: checked,
		items: newItems,
		displayedItems: newDisplayedItems,};
	}, this.setFormData.bind(this));
}

export function onItemChange(item, event) {
	function itemUpdater(current) {
		if (current.index === item.index) {
			return {
				...current,
				checked: event.target.checked,
			};
		}
		return current;
	}

	this.setState(prevState => {
		const newDisplayedItems = prevState.displayedItems.map(itemUpdater);
		return {
			toggleAllChecked: newDisplayedItems.length ===
				newDisplayedItems.filter(i => i.checked).length,
			items: prevState.items.map(itemUpdater),
			displayedItems: newDisplayedItems,
		};
	}, this.setFormData.bind(this));
}

export function onAbortHandler() {
	this.setState(
		prevState => ({
			displayMode: DISPLAY_MODE_DEFAULT,
			toggleAllChecked: prevState.items.length ===
				prevState.items.filter(i => i.checked).length,
			searchCriteria: null,
			displayedItems: prevState.items,
		}),
		this.setFormData.bind(this),
	);
}

export function onAddKeyDown(event) {
	if (event.keyCode === keycode('enter')) {
		event.stopPropagation();
		event.preventDefault();
	}
	if (event.keyCode === keycode('escape')) {
		event.stopPropagation();
		event.preventDefault();
		onAbortHandler.call(this);
	}
}
