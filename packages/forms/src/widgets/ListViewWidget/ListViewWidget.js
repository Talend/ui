import React, { PropTypes } from 'react';
import ListView from 'react-talend-components/lib/ListView';

import {
	search,
	abort,
} from './ListViewWidget.actions';

import {
	onInputChange,
	onToggleAll,
	onAbortHandler,
	onItemChange,
} from './ListViewWidget.handlers';


const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
const DISPLAY_MODE_SEARCH = 'DISPLAY_MODE_SEARCH';

class ListViewWidget extends React.Component {
	constructor(props) {
		super(props);
		const { options, value, onChange } = props;
		const { enumOptions } = options;

		console.log('[NC] value: ', value);

		this.timerSearch = null;
		this.value = value;

		this.defaultHeaderActions = [
			{ ...search, onClick: this.changeDisplayToSearchMode.bind(this) },
		];
		this.searchInputsActions = [
			{ ...abort, onClick: onAbortHandler.bind(this) },
		];

		let defaultDisplayMode = DISPLAY_MODE_DEFAULT;
		if (props.schema && props.schema.displayMode) {
			defaultDisplayMode = props.schema.displayMode;
		}

		this.state = {
			displayMode: defaultDisplayMode,
			required: (props.schema && props.schema.required) || false,
			headerDefault: this.defaultHeaderActions,
			headerSelected: this.selectedHeaderActions,
			headerInput: this.addInputs,
			onToggleAll: onToggleAll.bind(this),
			onInputChange: onInputChange.bind(this),
			items: enumOptions.map((option, index) => ({
				index,
				checked: value.indexOf(option.value) !== -1,
				label: option.label,
				onChange: onItemChange.bind(this),
				// onChange: (item, event) => {
				// 	onItemChange.call(
				// 		this,
				// 		item,
				// 		event,
				// 		() => onChange(this.state.items.filter(i => i.checked).map(f => f.label))
				// 	);
				// },
			})),
		};
	}

	setFormData() {
		this.props.onChange(this.state.items);
		if (this.props.onBlur) {
			this.props.onBlur(this.props.id, this.state.items);
		}
	}

	selectValue(value, selected, all) {
		const at = all.indexOf(value);
		const updated = selected.slice(0, at).concat(value, selected.slice(at));
		return updated.sort((a, b) => all.indexOf(a) > all.indexOf(b));
	}

	deselectValue(value, selected) {
		return selected.filter(v => v !== value);
	}

	searchItems(searchCriteria) {
		if (!searchCriteria) {
			return this.state.items;
		}
		const searchedItems = [];
		this.state.items.forEach((item) => {
			if (item.toLowerCase().includes(searchCriteria.toLowerCase())) {
				searchedItems.push(item);
			}
		});

		return searchedItems;
	}

	changeDisplayToSearchMode() {
		this.setState({
			headerInput: this.searchInputsActions,
			displayMode: DISPLAY_MODE_SEARCH,
		});
	}

	render() {
		const items = this.searchItems(this.state.searchCriteria);
		const stateToShow = { ...this.state, items };
		return (
			<div>
				<ListView {...stateToShow} />
			</div>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	ListViewWidget.propTypes = {
		id: PropTypes.string,
		registry: PropTypes.object, // eslint-disable-line
		formData: PropTypes.array, // eslint-disable-line
		schema: PropTypes.object, // eslint-disable-line
		onChange: PropTypes.func.isRequired,
		onBlur: PropTypes.func,
		value: PropTypes.any,
		options: PropTypes.shape({
			enumOptions: PropTypes.array,
		}).isRequired,
	};
}

export default ListViewWidget;
