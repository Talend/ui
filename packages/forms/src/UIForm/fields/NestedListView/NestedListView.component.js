import PropTypes from 'prop-types';
import React from 'react';
import keycode from 'keycode';
import ListView from '@talend/react-components/lib/ListView';
import { translate } from 'react-i18next';

import { I18N_DOMAIN_FORMS } from '../../../constants';
import getDefaultT from '../../../translate';
import { initItems, getDisplayedItems } from './NestedListView.utils';
import FieldTemplate from '../FieldTemplate';

import theme from './NestedListView.scss';

const DISPLAY_MODE_DEFAULT = 'DISPLAY_MODE_DEFAULT';
const DISPLAY_MODE_SEARCH = 'DISPLAY_MODE_SEARCH';
const DEFAULT_ITEM_HEIGHT = 33;

const getItemHeight = () => DEFAULT_ITEM_HEIGHT;

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

		this.onInputKeyDown = this.onInputKeyDown.bind(this);
		this.onInputChange = this.onInputChange.bind(this);

		const searchCriteria = null;

		const callbacks = {
			onExpandToggle: this.onExpandToggle.bind(this),
			onParentChange: this.onParentChange.bind(this),
			onCheck: this.onCheck.bind(this),
		};

		this.state = {
			...initItems(schema, value, searchCriteria, callbacks),
			searchCriteria,
			value,
		};
	}

	/**
	 * Click callback to toggle the expanded status of children elements
	 * @param {Object} event
	 * @param {Object} item
	 */
	onExpandToggle(event, item) {
		this.setState(({ items, value, searchCriteria }) => {
			const newItems = items.map(fieldItem => ({
				...fieldItem,
				expanded: fieldItem.key === item.key ? !fieldItem.expanded : fieldItem.expanded,
			}));

			return {
				items: newItems,
				displayedItems: getDisplayedItems(newItems, value, searchCriteria),
			};
		});
	}

	/**
	 * Handle checked item (parent) in the ListView change
	 * @param { Object } event The event that triggered the change
	 * @param { Object } item
	 */
	onParentChange(event, item) {
		console.log('[SG]', 'parent change', event);
		console.log('[SG]', 'parent change', event.currentTarget);
		console.log('[SG]', 'parent change', event.currentTarget());
		this.setState(
			({ items, value, searchCriteria }) => {
				const { enum: availableOptions } = this.props.schema.schema.properties[item.key].items;

				// Toggle all values
				const itemValue = value[item.key] || [];
				const newValue = { ...value, [item.key]: itemValue.length === 0 ? availableOptions : [] };

				return {
					value: newValue,
					displayedItems: getDisplayedItems(items, newValue, searchCriteria),
				};
			},
			() => this.onChange(event, this.state.value),
		);
	}

	/**
	 * Handle checked item (child) in the ListView change
	 * @param { Object } event
	 * @param { Object } item
	 * @param { Object } parent
	 */
	onCheck(event, item, parent) {
		this.setState(
			({ items, value, searchCriteria }) => {
				const { key } = parent;
				const newValue = { ...value };

				if (!(key in value)) {
					newValue[key] = [];
				}

				newValue[key] = newValue[key].includes(item.value)
					? newValue[key].filter(storedValue => storedValue !== item.value) // Unselect
					: newValue[key].concat(item.value); // Select

				return {
					value: newValue,
					displayedItems: getDisplayedItems(items, newValue, searchCriteria),
				};
			},
			() => this.onChange(event, this.state.value),
		);
	}

	/**
	 * Propagate a ListView value change
	 * @param { Object } event The event that triggered the change
	 * @param { Object } newValue The new Value
	 */
	onChange(event, newValue) {
		const payload = { schema: this.props.schema, value: newValue };
		this.props.onChange(event, payload);
		this.props.onFinish(event, payload);
	}

	/**
	 * Search input change
	 * @param { Object } event
	 * @param { Object } item
	 */
	onInputChange(event, item) {
		clearTimeout(this.timerSearch);
		this.timerSearch = setTimeout(() => {
			const { value: searchCriteria } = item;
			this.setState(({ items, value }) => ({
				searchCriteria,
				displayedItems: getDisplayedItems(items, value, searchCriteria),
			}));
		}, 400);
	}

	/**
	 * Search input ENTER/ESC management
	 * @param { Object } event The keydown event
	 */
	onInputKeyDown(event) {
		if (event.keyCode === keycode('enter')) {
			event.preventDefault();
		} else if (event.keyCode === keycode('escape')) {
			clearTimeout(this.timerSearch);
			event.preventDefault();
			this.switchToDefaultMode();
		}
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
		const searchCriteria = null;

		this.setState(({ items, value }) => ({
			displayedItems: getDisplayedItems(items, value, searchCriteria),
			searchCriteria,
			headerInput: this.defaultHeaderActions,
			displayMode: DISPLAY_MODE_DEFAULT,
		}));
	}

	render() {
		const { schema } = this.props;

		return (
			<div className={theme['nested-list-view']}>
				<FieldTemplate
					description={schema.description}
					errorMessage={this.props.errorMessage}
					id={this.props.id}
					isValid={this.props.isValid}
					required={schema.required}
				>
					<ListView
						{...this.state}
						getItemHeight={getItemHeight}
						id={this.props.id}
						items={this.state.displayedItems}
						headerDefault={this.defaultHeaderActions}
						onAddKeyDown={this.onInputKeyDown}
						onInputChange={this.onInputChange}
						headerLabel={schema.title}
						required={schema.required}
						searchPlaceholder={schema.placeholder}
						showToggleAll={false}
					/>
				</FieldTemplate>
			</div>
		);
	}
}

NestedListViewWidget.defaultProps = {
	value: {},
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
		value: PropTypes.object,
	};
}

export { NestedListViewWidget };

export default translate(I18N_DOMAIN_FORMS)(NestedListViewWidget);
