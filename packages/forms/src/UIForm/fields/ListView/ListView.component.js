import PropTypes from 'prop-types';
import React from 'react';
import ListView from '@talend/react-components/lib/ListView';

import FieldTemplate from '../FieldTemplate';

const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
const DISPLAY_MODE_SEARCH = 'DISPLAY_MODE_SEARCH';
const DEFAULT_ITEM_HEIGHT = 33;

class ListViewWidget extends React.Component {
	constructor(props) {
		super(props);

		this.onItemChange = this.onItemChange.bind(this);
		this.defaultHeaderActions = [{
			icon: 'talend-search',
			id: `${props.id}-search`,
			label: 'Search for specific values',
			onClick: this.switchToSearchMode.bind(this),
		}];
		this.searchHeaderActions = [{
			label: 'Abort',
			icon: 'talend-cross',
			id: 'abort',
			onClick: this.switchToDefaultMode.bind(this),
		}];

		this.state = {
			...this.initItems(props),
			getItemHeight: () => DEFAULT_ITEM_HEIGHT,
			headerDefault: this.defaultHeaderActions,
			onInputChange: this.onInputChange.bind(this),
			onToggleAll: this.onToggleAll.bind(this),
		};
	}

	componentWillReceiveProps(newProps) {
		if (newProps.schema !== this.props.schema) {
			this.setState(oldState => this.initItems(newProps, oldState));
		} else if (newProps.value !== this.props.value) {
			this.setState(oldState => this.updateItems(newProps, oldState));
		}
	}

	initItems({ schema, value }, { searchCriteria } = {}) {
		const items = schema.titleMap.map((option, index) => ({
			checked: value.indexOf(option.value) !== -1,
			index,
			label: option.name,
			onChange: this.onItemChange,
			value: option.value,
		}));
		const displayedItems = searchCriteria ?
			items.filter(item => item.label.toLowerCase().includes(searchCriteria.toLowerCase())) :
			items;
		const toggleAllChecked = displayedItems.every(item => item.checked);

		return {
			displayedItems,
			headerLabel: schema.title,
			items,
			required: schema.required,
			toggleAllChecked,
		};
	}

	updateItems({ value }, { displayedItems, items }) {
		function updateChecked(item) {
			const checked = value.indexOf(item.value) !== -1;
			if (item.checked !== checked) {
				return {
					...item,
					checked,
				};
			}
			return item;
		}

		const newItems = items.map(updateChecked);
		const newDisplayedItems = displayedItems.map(updateChecked);
		const toggleAllChecked = newDisplayedItems.every(item => item.checked);

		return {
			displayedItems: newDisplayedItems,
			items: newItems,
			toggleAllChecked,
		};
	}

	switchToSearchMode() {
		this.setState({
			headerInput: this.searchHeaderActions,
			displayMode: DISPLAY_MODE_SEARCH,
		});
	}

	switchToDefaultMode() {
		this.setState({
			headerInput: this.defaultHeaderActions,
			displayMode: DISPLAY_MODE_DEFAULT,
		});
	}

	onInputChange(event, value) {
		/*if (this.timerSearch) {
			clearTimeout(this.timerSearch);
		}
		this.timerSearch = setTimeout(() => {
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
				const searchCriteria = value.value;
				const newDisplayedItems = this.state.items.filter(
					item => item.label.toLowerCase().includes(searchCriteria.toLowerCase())
				);
				const toggleAllChecked = !!newDisplayedItems.length &&
					newDisplayedItems.length === newDisplayedItems.filter(i => i.checked).length;
				this.setState({
					toggleAllChecked,
					searchCriteria,
					displayedItems: newDisplayedItems,
				});
			}
			this.timerSearch = null;
		}, 400);*/
	}

	onItemChange(changedItem, event) {
		const value = this.state.items
			.filter((item) => {
				if (changedItem === item) {
					return !item.checked;
				}
				return item.checked;
			})
			.map(item => item.value);
		this.onChange(event, value);
	}

	onToggleAll(event) {
		const value = this.state.toggleAllChecked ?
			[] :
			this.state.items.map(item => item.value);
		this.onChange(event, value);
	}

	onChange(event, newValue) {
		const value = newValue.length ? newValue : undefined;
		const payload = { schema: this.props.schema, value };
		this.props.onChange(event, payload);
		this.props.onFinish(event, payload);
	}

	render() {
		return (
			<FieldTemplate
				description={this.props.schema.description}
				errorMessage={this.props.errorMessage}
				id={this.props.id}
				isValid={this.props.isValid}
			>
				<ListView {...this.state} />
			</FieldTemplate>
		);
	}
}

ListViewWidget.defaultProps = {
	value: [],
};

if (process.env.NODE_ENV !== 'production') {
	ListViewWidget.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			autoFocus: PropTypes.bool,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			placeholder: PropTypes.string,
			readOnly: PropTypes.bool,
			required: PropTypes.bool,
			title: PropTypes.string,
			titleMap: PropTypes.arrayOf(PropTypes.shape({
				name: PropTypes.string.isRequired,
				value: PropTypes.string.isRequired,
			})),
		}),
		value: PropTypes.string,
	};
}

export default ListViewWidget;
