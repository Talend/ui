import keycode from 'keycode';

const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
const LISTVIEW_SEARCH_ACTION = 'LISTVIEW_SEARCH_ACTION';

export function onSearchHandler() {
	this.setState({
		headerInput: this.searchInputsActions,
		searchCriteria: this.state.loadingSearchCriteria,
		loadingSearchCriteria: '',
	});
}

export function onInputChange(event, value) {
	if (this.timerSearch !== null) {
		clearTimeout(this.timerSearch);
	}
	this.timerSearch = setTimeout(() => {
		this.timerSearch = null;
		if (this.callActionHandler(LISTVIEW_SEARCH_ACTION, value.value, onSearchHandler.bind(this))) {
			this.setState({
				loadingSearchCriteria: value.value,
				headerInput: this.loadingInputsActions,
			});
		} else {
			const searchCriteria = value.value;
			const newDisplayedItems = this.state.items.filter(item =>
				item.label.toLowerCase().includes(searchCriteria.toLowerCase()),
			);
			const toggleAllChecked =
				!!newDisplayedItems.length &&
				newDisplayedItems.length === newDisplayedItems.filter(i => i.checked).length;
			this.setState({
				toggleAllChecked,
				searchCriteria,
				displayedItems: newDisplayedItems,
			});
		}
	}, 400);
}

export function onToggleAll() {
	const checked = !this.state.toggleAllChecked;
	const items = this.state.items;
	const displayedItems = this.state.displayedItems;
	const newItems = items.map(item => {
		const displayedItem = displayedItems.find(i => i.index === item.index);
		if (displayedItem) {
			return {
				...displayedItem,
				checked,
			};
		}
		return item;
	});
	const newDisplayedItems = this.state.displayedItems.map(displayedItem => ({
		...displayedItem,
		checked,
	}));
	this.setState(
		{
			toggleAllChecked: checked,
			items: newItems,
			displayedItems: newDisplayedItems,
		},
		this.setFormData.bind(this),
	);
}

export function onItemChange(event, item) {
	function itemUpdater(current) {
		if (current.index === item.index) {
			return {
				...current,
				checked: event.target.checked,
			};
		}
		return current;
	}

	const newDisplayedItems = this.state.displayedItems.map(itemUpdater);
	this.setState(
		{
			toggleAllChecked:
				newDisplayedItems.length === newDisplayedItems.filter(i => i.checked).length,
			items: this.state.items.map(itemUpdater),
			displayedItems: newDisplayedItems,
		},
		this.setFormData.bind(this),
	);
}

export function onAbortHandler() {
	const items = this.state.items;
	this.setState(
		{
			displayMode: DISPLAY_MODE_DEFAULT,
			toggleAllChecked: items.length === items.filter(i => i.checked).length,
			searchCriteria: null,
			displayedItems: items,
		},
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
