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
		if (this.callActionHandler(
				LISTVIEW_SEARCH_ACTION,
				value.value,
				onSearchHandler.bind(this)
			)) {
			this.setState({
				loadingSearchCriteria: value.value,
				headerInput: this.loadingInputsActions,
			});
		} else {
			this.setState({
				searchCriteria: value.value,
			});
		}
	}, 400);
}

export function onToggleAll() {
	const checked = !this.state.toggleAllChecked;
	this.setState({
		...this.state,
		toggleAllChecked: checked,
		items: this.state.items.map(i => ({ ...i, isSelected: checked })),
	});
}

export function onItemChange(item, event) {
	this.setState({
		...this.state,
		items: this.state.items.map((i) => ({
			...i,
			checked: i.index === item.index ? event.target.checked : i.checked,
		})),
	}, this.setFormData.bind(this));
}

export function onAbortHandler() {
	this.setState({ displayMode: DISPLAY_MODE_DEFAULT, searchCriteria: null });
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
