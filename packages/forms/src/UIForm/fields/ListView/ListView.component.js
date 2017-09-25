import PropTypes from 'prop-types';
import React from 'react';
import keycode from 'keycode';
import ListView from '@talend/react-components/lib/ListView';

import { getItemsProps, initItems, updateItems } from './ListView.utils';
import FieldTemplate from '../FieldTemplate';

const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
const DISPLAY_MODE_SEARCH = 'DISPLAY_MODE_SEARCH';
const DEFAULT_ITEM_HEIGHT = 33;

class ListViewWidget extends React.Component {
	constructor(props) {
		super(props);

		this.defaultHeaderActions = [
			{
				icon: 'talend-search',
				id: `${props.id}-search`,
				label: 'Search for specific values',
				onClick: this.switchToSearchMode.bind(this),
			},
		];
		this.searchHeaderActions = [
			{
				label: 'Abort',
				icon: 'talend-cross',
				id: 'abort',
				onClick: this.switchToDefaultMode.bind(this),
			},
		];

		this.state = {
			...this.initItems(props),
			getItemHeight: () => DEFAULT_ITEM_HEIGHT,
			headerDefault: this.defaultHeaderActions,
			onAddKeyDown: this.onInputKeyDown.bind(this),
			onInputChange: this.onInputChange.bind(this),
			onToggleAll: this.onToggleAll.bind(this),
		};
	}

	/**
	 * On new schema : we redefine the items
	 * On new value : we update the check status
	 * @param { Object } schema The new mergedSchema
	 * @param { Array } value The new value
	 */
	componentWillReceiveProps({ schema, value }) {
		if (schema !== this.props.schema) {
			this.setState(oldState =>
				initItems(schema, value, oldState.searchCriteria, this.onToggleItem.bind(this)),
			);
		} else if (value !== this.props.value) {
			this.setState(oldState =>
				updateItems(oldState.items, value, oldState.searchCriteria)
			);
		}
	}

	/**
	 * Propagate a ListView value change
	 * @param { Object } event The event that triggered the change
	 * @param { Array } newValue The new Value
	 */
	onChange(event, newValue) {
		const value = newValue.length ? newValue : undefined;
		const payload = { schema: this.props.schema, value };
		this.props.onChange(event, payload);
		this.props.onFinish(event, payload);
	}

	/**
	 * Search input change
	 * @param { Object } event The change event
	 * @param { Array } value
	 */
	onInputChange(event, { value }) {
		if (this.timerSearch) {
			clearTimeout(this.timerSearch);
		}
		this.timerSearch = setTimeout(() => {
			this.setState(getItemsProps(this.state.items, value));
			this.timerSearch = null;
		}, 400);
	}

	/**
	 * Search input ENTER/ESC management
	 * @param { Object } event The keydown event
	 */
	onInputKeyDown(event) {
		if (event.keyCode === keycode('enter')) {
			event.stopPropagation();
			event.preventDefault();
		}
		if (event.keyCode === keycode('escape')) {
			event.stopPropagation();
			event.preventDefault();
			this.switchToDefaultMode();
		}
	}

	/**
	 * Toggle an item
	 * @param { Object } event The toggle event
	 * @param { Object } changedItem The item to toggle
	 */
	onToggleItem(event, changedItem) {
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

	/**
	 * Toggle all displayed items
	 * - Filtered items : toggle only the displayed items
	 * - No filter : toggle all items
	 * @param { Object } event the toggle event
	 */
	onToggleAll(event) {
		let checkedItems;
		if (this.state.searchCriteria && this.state.toggleAllChecked) {
			// User uncheck with filter : we remove filtered items from checked list
			checkedItems = this.state.items.filter(
				item => item.checked && !this.state.displayedItems.includes(item),
			);
		} else if (this.state.searchCriteria && !this.state.toggleAllChecked) {
			// User check with filter : we add filtered items in checked list
			checkedItems = this.state.items.filter(
				item => item.checked || this.state.displayedItems.includes(item),
			);
		} else if (this.state.toggleAllChecked) {
			// User uncheck all items
			checkedItems = [];
		} else {
			// User check all items
			checkedItems = this.state.items;
		}

		const value = checkedItems.map(item => item.value);
		this.onChange(event, value);
	}

	/**
	 * Switch header to search mode
	 */
	switchToSearchMode() {
		this.setState({
			headerInput: this.searchHeaderActions,
			displayMode: DISPLAY_MODE_SEARCH,
		});
	}

	/**
	 * Switch header to default mode.
	 * Reset display to no filter
	 */
	switchToDefaultMode() {
		this.setState(oldState => ({
			...getItemsProps(oldState.items),
			headerInput: this.defaultHeaderActions,
			displayMode: DISPLAY_MODE_DEFAULT,
		}));
	}

	render() {
		return (
			<FieldTemplate
				description={this.props.schema.description}
				errorMessage={this.props.errorMessage}
				id={this.props.id}
				isValid={this.props.isValid}
			>
				<ListView {...this.state} items={this.state.displayedItems} />
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
			titleMap: PropTypes.arrayOf(
				PropTypes.shape({
					name: PropTypes.string.isRequired,
					value: PropTypes.string.isRequired,
				}),
			),
		}),
		value: PropTypes.arrayOf(PropTypes.string),
	};
}

export default ListViewWidget;
