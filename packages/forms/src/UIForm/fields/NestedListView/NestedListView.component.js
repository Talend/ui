import PropTypes from 'prop-types';
import React from 'react';
import keycode from 'keycode';
import ListView from '@talend/react-components/lib/ListView';
import { translate } from 'react-i18next';

import { I18N_DOMAIN_FORMS } from '../../../constants';
import getDefaultT from '../../../translate';
import { getItemsProps, initItems } from './NestedListView.utils';
import FieldTemplate from '../FieldTemplate';

import theme from './NestedListView.scss';

const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
const DISPLAY_MODE_SEARCH = 'DISPLAY_MODE_SEARCH';
const DEFAULT_ITEM_HEIGHT = 33;

class NestedListViewWidget extends React.Component {
	constructor(props) {
		super(props);

		const { t, value, schema, id } = props;

		this.defaultHeaderActions = [
			{
				id: `${id}-search`,
				icon: 'talend-search',
				label: t('LISTVIEW_WIDGET_SEARCH', { defaultValue: 'Search for specific values' }),
				onClick: this.switchToSearchMode.bind(this),
			},
		];

		this.defaultSearchHeaderActions = [
			{
				id: 'abort',
				icon: 'talend-cross',
				label: t('LISTVIEW_WIDGET_ABORT', { defaultValue: 'Abort' }),
				onClick: this.switchToDefaultMode.bind(this),
			},
		];

		const toggledChildren = [];

		this.state = {
			...initItems(schema, value, null, toggledChildren, this.getInitItemsCallbacks()),
			toggledChildren,
			value,
			getItemHeight: () => DEFAULT_ITEM_HEIGHT,
			headerDefault: this.defaultHeaderActions,
			onAddKeyDown: this.onInputKeyDown.bind(this),
			onInputChange: this.onInputChange.bind(this),
		};
	}

	/**
	 * Click callback to toggle the expanded status of children elements
	 * @param {Object} event
	 * @param {Object} item
	 */
	onExpandToggle(event, item) {
		this.setState(state => {
			const { items, value, searchCriteria, toggledChildren } = state;
			const { toggleId } = item;

			const newToggledChildren = toggledChildren.includes(toggleId)
				? toggledChildren.filter(toggled => toggled !== toggleId)
				: [...toggledChildren, toggleId];

			return getItemsProps(items, value, searchCriteria, newToggledChildren);
		});
	}

	/**
	 * Handle checked item (parent) in the ListView change
	 * @param { Object } event The event that triggered the change
	 * @param { Object } item
	 */
	onParentChange(event, item) {
		this.setState(state => {
			const { items, value, searchCriteria, toggledChildren } = state;
			const { enum: availableOptions } = this.props.schema.schema.properties[item.key].items;

			// Toggle all values
			const itemValue = value[item.key] || [];
			value[item.key] = itemValue.length === 0 ? availableOptions : [];

			this.onChange(event, value);

			return {
				value,
				...getItemsProps(items, value, searchCriteria, toggledChildren),
			};
		});
	}

	/**
	 * Handle checked item (child) in the ListView change
	 * @param { Object } event The event that triggered the change
	 * @param { Object } checked
	 * @param { Object } parent
	 */
	onCheck(event, checked, parent) {
		this.setState(state => {
			const { items, value, searchCriteria, toggledChildren } = state;
			const { key } = parent;

			// Toggle checked value from state
			const isParentKeyInValue = parent.key in value;

			if (!isParentKeyInValue || !value[key].includes(checked.value)) {
				// Add
				if (!isParentKeyInValue) {
					value[key] = [];
				}
				value[key].push(checked.value);
			} else {
				// Remove
				value[key] = value[key].filter(storedValue => storedValue !== checked.value);
			}

			this.onChange(event, value);

			return {
				value,
				...getItemsProps(items, value, searchCriteria, toggledChildren),
			};
		});
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
	onInputChange(event, item) {
		clearTimeout(this.timerSearch);
		this.timerSearch = setTimeout(() => {
			this.setState(state =>
				getItemsProps(state.items, state.value, item.value, state.toggledChildren),
			);
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
		} else if (event.keyCode === keycode('escape')) {
			clearTimeout(this.timerSearch);
			event.stopPropagation();
			event.preventDefault();
			this.switchToDefaultMode();
		}
	}

	/**
	 * Get all callbacks use to init ListView items
	 * @returns {Object}
	 */
	getInitItemsCallbacks() {
		return {
			onExpandToggle: this.onExpandToggle.bind(this),
			onParentChange: this.onParentChange.bind(this),
			onCheck: this.onCheck.bind(this),
		};
	}

	/**
	 * Switch header to search mode
	 */
	switchToSearchMode() {
		this.setState({
			headerInput: this.defaultSearchHeaderActions,
			displayMode: DISPLAY_MODE_SEARCH,
		});
	}

	/**
	 * Switch header to default mode.
	 * Reset display to no filter
	 */
	switchToDefaultMode() {
		this.setState(({ items, value, toggledChildren }) => ({
			...getItemsProps(items, value, null, toggledChildren),
			headerInput: this.defaultHeaderActions,
			displayMode: DISPLAY_MODE_DEFAULT,
		}));
	}

	render() {
		return (
			<div className={theme['nested-list-view']}>
				<FieldTemplate
					description={this.props.schema.description}
					errorMessage={this.props.errorMessage}
					id={this.props.id}
					isValid={this.props.isValid}
					required={this.props.schema.required}
				>
					<ListView
						{...this.state}
						id={this.props.id}
						items={this.state.displayedItems}
						t={this.props.t}
					/>
				</FieldTemplate>
			</div>
		);
	}
}

NestedListViewWidget.defaultProps = {
	value: [],
	t: getDefaultT(),
};

if (process.env.NODE_ENV !== 'production') {
	NestedListViewWidget.propTypes = {
		id: PropTypes.string,
		isValid: PropTypes.bool,
		errorMessage: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			schema: PropTypes.object,
			description: PropTypes.string,
			disabled: PropTypes.bool,
			placeholder: PropTypes.string,
			required: PropTypes.bool,
			title: PropTypes.string,
		}),
		value: PropTypes.arrayOf(PropTypes.string),
		t: PropTypes.func,
	};
}

export { NestedListViewWidget };

export default translate(I18N_DOMAIN_FORMS)(NestedListViewWidget);
