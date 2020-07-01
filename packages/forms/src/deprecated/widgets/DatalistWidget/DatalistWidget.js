import PropTypes from 'prop-types';
import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import Emphasis from '@talend/react-components/lib/Emphasis';
import classnames from 'classnames';
import get from 'lodash/get';
import Autowhatever from 'react-autowhatever';
import keycode from 'keycode';
import theme from './DatalistWidget.scss';

/**
 * Escape regexp special chars
 */
export function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Render the datalist suggestion items container
 * @param props
 */
function DefaultRenderDatalistItemContainer({ containerProps, ...rest }) {
	return <div {...containerProps} {...rest} />;
}
DefaultRenderDatalistItemContainer.propTypes = {
	containerProps: PropTypes.object,
};

/**
 * Render an empty container
 */
function DefaultRenderNoMatch() {
	return (
		<div className={`${theme['items-container']} ${theme['no-result']}`}>
			<span>No match.</span>
		</div>
	);
}

/**
 * Convert a datalist item as a value/label pair if needed
 */
function getValueLabelPair(item) {
	if (typeof item === 'object') {
		return { [item.value]: item.label };
	}
	return { [item]: item };
}

/**
 * Returns the value/label map from given items
 */
function getItemsMap(items) {
	if (!items || !items.length) {
		return {};
	}

	return items.reduce((a, b) => Object.assign(a, getValueLabelPair(b)), {});
}

let dontBlur = false;
function itemsContainerClickHandler() {
	dontBlur = true;
	setTimeout(() => {
		dontBlur = false;
	});
}

function renderSectionTitle(section) {
	return <div className={theme.title}>{section.title}</div>;
}

function getSectionItems(section) {
	return section.items;
}

/**
 * Render a typeahead for filtering among a list
 * @param props
 */
class DatalistWidget extends React.Component {
	static itemContainerStyle = theme['items-container'];

	static noResultStyle = theme['no-result'];

	static emptyStyle = theme.empty;

	constructor(props) {
		super(props);

		const value = props.value || '';
		this.state = {
			value,
			lastKnownValue: value,
			initialItems: [],
			items: [],
			itemIndex: null,
			noMatch: false,
			itemsMap: getItemsMap(this.getItems()),
			hasFocus: false,
		};

		this.inputProps = {
			placeholder: props.placeholder,
			required: props.required,
			onBlur: event => this.onBlur(event),
			onFocus: () => {
				this.setState({ hasFocus: true });
				this.initSuggestions(this.state.value);
			},
			onChange: event => this.updateSuggestions(event.target.value),
			onKeyDown: (event, payload) => this.onKeyDown(event, payload),
		};

		this.itemProps = {
			onMouseEnter: (event, { sectionIndex, itemIndex }) =>
				this.focusOnItem(sectionIndex, itemIndex),
			onMouseLeave: () => this.focusOnItem(),
			onMouseDown: (event, { sectionIndex, itemIndex }) => this.selectItem(sectionIndex, itemIndex),
		};

		this.renderDatalistItem = this.renderDatalistItem.bind(this);
		this.renderDatalistInput = this.renderDatalistInput.bind(this);
		this.getDropdownItems = this.getDropdownItems.bind(this);

		this.style = {
			container: classnames(
				'form-control',
				theme['tf-typeahead-container'],
				'tf-typeahead-container',
			),
			containerOpen: theme['container-open'],
			highlight: theme['highlight-match'],
			input: theme['typeahead-input'],
			itemHighlighted: theme['item-highlighted'],
			itemsContainer: theme['items-container'],
			itemsList: theme.items,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
			this.setValue(nextProps.value);
		}
	}

	onBlur(event) {
		if (dontBlur) {
			return;
		}
		this.setState({ hasFocus: false });
		const inputLabel = event.target.value;
		const { options, onChange } = this.props;
		const { value, lastKnownValue } = this.state;
		const inputValue = this.getValue(inputLabel);
		const isIncluded = this.isPartOfItems(value);

		if (this.reference && this.reference.itemsContainer) {
			this.reference.itemsContainer.removeEventListener('mousedown', itemsContainerClickHandler);
		}
		if (options.restricted && !isIncluded) {
			this.resetValue();
			if (inputLabel !== this.getLabel(lastKnownValue)) {
				onChange(undefined);
			}
		} else if (!options.restricted || (options.restricted && isIncluded)) {
			this.setValue(inputValue);
			if (inputLabel !== this.getLabel(lastKnownValue)) {
				onChange(inputValue);
			}
			this.resetSuggestions();
		}
	}

	onKeyDown(
		event,
		{
			newHighlightedSectionIndex,
			newHighlightedItemIndex,
			highlightedSectionIndex,
			highlightedItemIndex,
		},
	) {
		switch (event.which) {
			case keycode.codes.esc:
				this.resetValue();
				event.preventDefault();
				break;
			case keycode.codes.enter:
				// could be null in case of no match
				if (highlightedItemIndex !== null) {
					this.selectItem(highlightedSectionIndex, highlightedItemIndex);
				}
				event.preventDefault();
				break;
			case keycode.codes.up:
			case keycode.codes.down:
				event.preventDefault();
				this.focusOnItem(newHighlightedSectionIndex, newHighlightedItemIndex);
				break;
			default:
				break;
		}
	}

	getLabel(value) {
		const { itemsMap } = this.state;
		const hasItems = itemsMap && Object.keys(itemsMap).length;

		if (hasItems && Object.prototype.hasOwnProperty.call(itemsMap, value)) {
			return itemsMap[value];
		}
		return value != null ? value : '';
	}

	getValue(item) {
		const { itemsMap } = this.state;
		const key = Object.keys(itemsMap).find(k => itemsMap[k] === item);

		if (key != null) {
			return key;
		}
		if (item != null && item.length) {
			return item;
		}
		return undefined;
	}

	/**
	 * Filter suggestions
	 * @param suggestions
	 * @param value
	 */
	getMatchingSuggestions(suggestions = [], value) {
		if (!value) {
			return suggestions;
		}

		const escapedValue = escapeRegexCharacters(this.getLabel(value).trim());
		const regex = new RegExp(escapedValue, 'i');

		return suggestions.filter(item => regex.test(item.label));
	}

	setValue(value) {
		this.setState({ value, lastKnownValue: value });
	}

	getItems() {
		const { options, schema, formContext } = this.props;

		if (options && options.enumOptions && options.groupBy) {
			return options.enumOptions.map(item => ({ value: item.value, ...item.label }));
		} else if (options && options.enumOptions) {
			return options.enumOptions;
		} else if (schema && schema.enum) {
			return schema.enum.map(item => ({ label: item, value: item }));
		} else if (formContext && formContext.fetchItems) {
			return formContext
				.fetchItems(schema.title)
				.map(item => (typeof item === 'string' ? { value: item, label: item } : item));
		}
		return [];
	}

	getDropdownItems(suggestions) {
		// options with categories
		if (this.props.options && this.props.options.groupBy) {
			const category = this.props.options.groupBy;
			const categoryMap = suggestions.reduce((acc, cur) => {
				const obj = {};
				obj[cur[category]] = acc[cur[category]] || [];
				obj[cur[category]].push({
					text: cur.label,
					value: cur.value,
				});
				return { ...acc, ...obj };
			}, {});
			return Object.keys(categoryMap).map(key => ({ title: key, items: categoryMap[key] }));
		} else if (this.props.options && this.props.options.enumOptions) {
			return suggestions.map(s => s.value);
		} else if (this.props.schema && this.props.schema.enum) {
			return suggestions.map(s => s.value);
		} else if (this.props.formContext && this.props.formContext.fetchItems) {
			return suggestions.map(s => s.value);
		}
		return suggestions;
	}

	getSelectedItem(sectionIndex, itemIndex) {
		if (sectionIndex != null) {
			return this.state.items[sectionIndex].items[itemIndex].value;
		}
		return this.state.items[itemIndex];
	}

	isPartOfItems(value) {
		const { initialItems, itemsMap } = this.state;
		return (
			initialItems.includes(value) ||
			initialItems.find(item => item.value === value) ||
			Object.keys(itemsMap).some(k => itemsMap[k] === value)
		);
	}

	resetValue() {
		this.setValue('');
		this.resetSuggestions();
	}

	initSuggestions(value) {
		const items = this.getItems();
		const itemsMap = getItemsMap(items);
		const keys = Object.keys(itemsMap);
		const suggestions = this.getMatchingSuggestions(items, value);

		if (this.reference && this.reference.itemsContainer) {
			this.reference.itemsContainer.addEventListener('mousedown', itemsContainerClickHandler);
		}
		this.setState({
			value,
			initialItems: items,
			items: this.getDropdownItems(suggestions),
			sectionIndex: null,
			itemIndex: null,
			noMatch: value && keys && !keys.length,
			itemsMap,
		});
	}

	updateSuggestions(value) {
		let suggestions = this.getMatchingSuggestions(this.state.initialItems, value);
		if (!value && suggestions && suggestions.length === 0) {
			suggestions = this.state.initialItems;
		}

		this.setState({
			value,
			items: this.getDropdownItems(suggestions),
			sectionIndex: null,
			itemIndex: null,
			noMatch: value && suggestions && !suggestions.length,
		});
	}

	resetSuggestions() {
		this.setState({
			items: [],
			sectionIndex: null,
			itemIndex: null,
			noMatch: false,
		});
	}

	focusOnItem(sectionIndex, itemIndex) {
		this.setState({ sectionIndex, itemIndex });
	}

	selectItem(sectionIndex, itemIndex) {
		const selectedItem = this.getSelectedItem(sectionIndex, itemIndex);

		if (selectedItem && selectedItem !== this.state.value) {
			this.setValue(selectedItem);
			this.resetSuggestions();
			this.props.onChange(selectedItem);
		}
	}

	/**
	 * Render the datalist suggestion item
	 * @param item
	 * @param value
	 */
	renderDatalistItem(item, { value }) {
		if (!item) {
			return null;
		}
		return (
			<div className={classnames(theme.item, 'datalist-item')}>
				<Emphasis value={this.getLabel(value)} text={this.getLabel(item)} />
			</div>
		);
	}

	/**
	 * Render the datalist input
	 * @param props
	 */
	renderDatalistInput(props) {
		return (
			<div className={theme['typeahead-input-icon']}>
				<FormControl {...props} value={this.getLabel(props.value)} />
				<div className={theme['dropdown-toggle']}>
					<span className="caret" />
				</div>
			</div>
		);
	}

	render() {
		let renderItemsContainer;
		const value = this.state.value;
		const renderItemData = { value };
		const renderNoMatch = this.props.renderNoMatch || DefaultRenderNoMatch;

		this.inputProps.value = value;
		if (this.state.noMatch) {
			renderItemsContainer = renderNoMatch;
		} else if (
			get(this.state, 'initialItems.length') === 0 &&
			this.state.hasFocus &&
			this.props.renderEmptyList
		) {
			renderItemsContainer = this.props.renderEmptyList;
		} else if (this.props.renderItemsContainer) {
			renderItemsContainer = this.props.renderItemsContainer;
		} else {
			renderItemsContainer = DefaultRenderDatalistItemContainer;
		}

		const props = {
			id: this.props.id,
			items: this.state.items,
			renderItem: this.renderDatalistItem,
			inputProps: this.inputProps,
			theme: this.style,
			renderItemData,
			renderInputComponent: this.renderDatalistInput,
			renderItemsContainer,
			itemProps: this.itemProps,
			highlightedItemIndex: this.state.itemIndex,
			ref: ref => {
				this.reference = ref;
			},
		};

		const propsWithCategory = {
			...props,
			multiSection: true,
			renderSectionTitle,
			getSectionItems,
			renderItem: (item, filter) => this.renderDatalistItem(item.text, filter),
			highlightedSectionIndex: this.state.sectionIndex,
		};

		if (this.props.options && this.props.options.groupBy) {
			return <Autowhatever {...propsWithCategory} />;
		}
		return <Autowhatever {...props} />;
	}
}

DatalistWidget.defaultProps = {
	options: {},
	formContext: {},
};

if (process.env.NODE_ENV !== 'production') {
	DatalistWidget.propTypes = {
		id: PropTypes.string,
		value: PropTypes.string,
		required: PropTypes.bool,
		onChange: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			title: PropTypes.string.isRequired,
			enum: PropTypes.arrayOf(PropTypes.string),
		}).isRequired,
		formContext: PropTypes.shape({
			fetchItems: PropTypes.func,
		}),
		options: PropTypes.shape({
			enumOptions: PropTypes.array,
			// Is the field value restricted to the suggestion list
			restricted: PropTypes.bool,
			groupBy: PropTypes.string,
		}),
		renderItemsContainer: PropTypes.func,
		renderEmptyList: PropTypes.func,
		renderNoMatch: PropTypes.func,
		placeholder: PropTypes.string,
	};
}

export default DatalistWidget;
