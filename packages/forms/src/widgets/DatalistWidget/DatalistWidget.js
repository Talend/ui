import React, { PropTypes } from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import classnames from 'classnames';
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
function defaultRenderDatalistItemContainer(props) {
	return <div {...props} />;
}

/**
 * Render an empty container
 */
function defaultRenderNoMatch() {
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

/**
 * Returns undefined if value is an empty string
 */
function processValue(value) {
	if (value && value.length) {
		return value;
	}
	return undefined;
}


/**
 * Render a typeahead for filtering among a list
 * @param props
 */
class DatalistWidget extends React.Component {
	static itemContainerStyle = theme['items-container'];
	static noResultStyle = theme['no-result'];

	constructor(props) {
		super(props);

		this.state = {
			value: props.value || '',
			initalItems: [],
			items: [],
			itemIndex: null,
			noMatch: false,
			itemsMap: getItemsMap(this.getItems()),
		};

		this.inputProps = {
			placeholder: props.placeholder,
			required: props.required,
			onBlur: () => this.onBlur(),
			onFocus: () => this.initSuggestions(this.state.value),
			onChange: event => this.updateSuggestions(event.target.value),
			onKeyDown: (event, payload) => this.onKeyDown(event, payload),
		};

		this.itemProps = {
			onMouseEnter: (event, { itemIndex }) => this.focusOnItem(itemIndex),
			onMouseLeave: () => this.focusOnItem(),
			onMouseDown: (event, { itemIndex }) => this.selectItem(itemIndex),
		};

		this.renderDatalistItem = this.renderDatalistItem.bind(this);
		this.renderDatalistInput = this.renderDatalistInput.bind(this);

		this.style = {
			container: classnames(
				'form-control',
				theme['tf-typeahead-container'],
				'tf-typeahead-container'
			),
			containerOpen: theme['container-open'],
			highlight: theme['highlight-match'],
			input: theme['typeahead-input'],
			itemFocused: theme['item-focused'],
			itemsContainer: theme['items-container'],
			itemsList: theme.items,
		};
	}

	onBlur() {
		const { options } = this.props;
		const included = this.state.initalItems.includes(this.state.value);

		if (options.restricted && !included) {
			this.resetValue();
		} else if ((options.restricted && included) || !options.restricted) {
			this.props.onChange(processValue(this.state.value));
			this.resetSuggestions();
		}
	}

	onKeyDown(event, { focusedItemIndex, newFocusedItemIndex }) {
		switch (event.which) {
		case keycode.codes.esc:
			this.resetValue();
			event.preventDefault();
			break;
		case keycode.codes.enter:
			// could be null in case of no match
			if (focusedItemIndex != null) {
				this.selectItem(focusedItemIndex);
			}
			event.preventDefault();
			break;
		case keycode.codes.up:
		case keycode.codes.down:
			event.preventDefault();
			this.focusOnItem(newFocusedItemIndex);
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
		return value;
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

		const escapedValue = escapeRegexCharacters(value.trim());
		const regex = new RegExp(escapedValue, 'i');
		return suggestions.filter(item => regex.test(this.getLabel(item)));
	}

	setValue(value) {
		this.setState({ value: processValue(value) });
	}

	getItems() {
		const { options, schema, formContext } = this.props;

		if (options && options.enumOptions) {
			return options.enumOptions;
		} else if (schema && schema.enum) {
			return schema.enum;
		} else if (formContext && formContext.fetchItems) {
			return formContext.fetchItems(schema.title);
		}
		return [];
	}

	resetValue() {
		this.setValue('');
		this.resetSuggestions();
	}

	initSuggestions(value) {
		const itemsMap = getItemsMap(this.getItems());
		const keys = Object.keys(itemsMap);
		const suggestions = this.getMatchingSuggestions(keys, value);

		this.setState({
			value,
			initalItems: keys,
			items: suggestions,
			itemIndex: null,
			noMatch: value && keys && !keys.length,
			itemsMap,
		});
	}

	updateSuggestions(value) {
		this.setState((prevState) => {
			let suggestions = this.getMatchingSuggestions(
				prevState.initalItems,
				value,
			);
			if (!value && suggestions && suggestions.length === 0) {
				suggestions = prevState.initalItems;
			}

			return {
				value,
				items: suggestions,
				itemIndex: null,
				noMatch: value && suggestions && !suggestions.length,
			};
		});
	}

	resetSuggestions() {
		this.setState({
			items: [],
			itemIndex: null,
			noMatch: false,
		});
	}

	focusOnItem(itemIndex) {
		this.setState({ itemIndex });
	}

	selectItem(itemIndex) {
		const selectedItem = this.state.items[itemIndex];
		const selectedItemLabel = this.getLabel(selectedItem);

		if (selectedItemLabel && selectedItemLabel !== this.state.value) {
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
		const label = this.getLabel(item);
		let emphasisedText = [label];

		if (value) {
			emphasisedText = [];
			const regex = new RegExp(escapeRegexCharacters(value), 'gi');
			const matchedValues = label.match(regex);
			const restValues = label.split(regex);

			restValues.forEach((val, i) => {
				emphasisedText.push(val);
				if (matchedValues[i]) {
					emphasisedText.push(<em className={theme['highlight-match']}>{matchedValues[i]}</em>);
				}
			});
		}

		return (
			<div className={classnames(theme.item, 'datalist-item')}>
				{emphasisedText.map((val, index) => <span key={index}>{val}</span>)}
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
				<FormControl
					{...props}
					value={this.getLabel(props.value)}
				/>
				<div className={theme['dropdown-toggle']}>
					<span className="caret" />
				</div>
			</div>);
	}

	render() {
		let renderItemsContainer;
		const value = this.state.value;
		const renderItemData = { value };
		const renderNoMatch = this.props.renderNoMatch || defaultRenderNoMatch;

		this.inputProps.value = value;
		if (this.state.noMatch) {
			renderItemsContainer = renderNoMatch;
		} else if (this.props.renderItemsContainer) {
			renderItemsContainer = this.props.renderItemsContainer;
		} else {
			renderItemsContainer = defaultRenderDatalistItemContainer;
		}

		return (
			<Autowhatever
				id={this.props.id}
				items={this.state.items}
				renderItem={this.renderDatalistItem}
				inputProps={this.inputProps}
				theme={this.style}
				renderItemData={renderItemData}
				renderInputComponent={this.renderDatalistInput}
				renderItemsContainer={renderItemsContainer}
				focusedItemIndex={this.state.itemIndex}
				itemProps={this.itemProps}
			/>
		);
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
		}),
		renderItemsContainer: PropTypes.func,
		renderNoMatch: PropTypes.func,
		placeholder: PropTypes.string,
	};
}

export default DatalistWidget;
