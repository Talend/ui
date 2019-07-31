import PropTypes from 'prop-types';
import React from 'react';
import keycode from 'keycode';
import ListView from '@talend/react-components/lib/ListView';
import { withTranslation } from 'react-i18next';

import { I18N_DOMAIN_FORMS } from '../../../constants';
import getDefaultT from '../../../translate';
import { getDisplayedItems, prepareItemsFromSchema } from './NestedListView.utils';
import { generateDescriptionId, generateErrorId } from '../../Message/generateId';
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

		const callbacks = {
			onExpandToggle: this.onExpandToggle.bind(this),
			onParentChange: this.onParentChange.bind(this),
			onCheck: this.onCheck.bind(this),
		};

		this.items = prepareItemsFromSchema(schema, callbacks);
		this.value = value;

		this.state = {
			searchCriteria: null,
			displayedItems: getDisplayedItems(this.items, this.value),
		};
	}

	/**
	 * Click callback to toggle the expanded status of children elements
	 * @param {Object} event
	 * @param {Object} item
	 */
	onExpandToggle(event, item) {
		this.items = this.items.map(fieldItem => {
			if (fieldItem.key === item.key) {
				return { ...fieldItem, expanded: !fieldItem.expanded };
			}
			return fieldItem;
		});

		this.setState(({ searchCriteria }) => ({
			displayedItems: getDisplayedItems(this.items, this.value, searchCriteria),
		}));
	}

	/**
	 * Handle checked item (parent) in the ListView change
	 * @param { Object } event The event that triggered the change
	 * @param { Object } item
	 */
	onParentChange(event, item) {
		const { enum: availableOptions } = this.props.schema.schema.properties[item.key].items;

		// Toggle all values
		this.value = {
			...this.value,
			[item.key]: (this.value[item.key] || []).length === 0 ? availableOptions : [],
		};

		this.setState(
			({ searchCriteria }) => ({
				displayedItems: getDisplayedItems(this.items, this.value, searchCriteria),
			}),
			() => this.onChange(event),
		);
	}

	/**
	 * Handle checked item (child) in the ListView change
	 * @param { Object } event
	 * @param { Object } item
	 * @param { Object } parent
	 */
	onCheck(event, item, parent) {
		const { key } = parent;

		if (!(key in this.value)) {
			this.value[key] = [];
		}

		this.value[key] = this.value[key].includes(item.value)
			? this.value[key].filter(storedValue => storedValue !== item.value) // Unselect
			: this.value[key].concat(item.value); // Select

		this.setState(
			({ searchCriteria }) => ({
				displayedItems: getDisplayedItems(this.items, this.value, searchCriteria),
			}),
			() => this.onChange(event),
		);
	}

	/**
	 * Propagate a ListView value change
	 * @param { Object } event The event that triggered the change
	 * @param { Object } newValue The new Value
	 */
	onChange(event) {
		const payload = { schema: this.props.schema, value: this.value };
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
			this.setState({
				searchCriteria,
				displayedItems: getDisplayedItems(this.items, this.value, searchCriteria),
			});
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

		this.setState({
			displayedItems: getDisplayedItems(this.items, this.value, searchCriteria),
			searchCriteria,
			headerInput: this.defaultHeaderActions,
			displayMode: DISPLAY_MODE_DEFAULT,
		});
	}

	render() {
		const { id, schema } = this.props;

		return (
			<div className={theme['nested-list-view']}>
				<FieldTemplate
					description={schema.description}
					descriptionId={generateDescriptionId(id)}
					errorId={generateErrorId(id)}
					errorMessage={this.props.errorMessage}
					id={id}
					isValid={this.props.isValid}
					required={schema.required}
					valueIsUpdating={this.props.valueIsUpdating}
				>
					<ListView
						{...this.state}
						getItemHeight={schema.autosize ? null : getItemHeight}
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
			autosize: PropTypes.bool,
		}),
		value: PropTypes.object,
		valueIsUpdating: PropTypes.bool,
		t: PropTypes.func,
	};
}

export { NestedListViewWidget };

export default withTranslation(I18N_DOMAIN_FORMS)(NestedListViewWidget);
