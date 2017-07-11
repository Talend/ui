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
	return (<div {...props} />);
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
	return typeof item === 'object'
	? { [item.value]: item.label }
	: { [item]: item };
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
		};

		this.inputProps = {
			placeholder: props.placeholder,
			required: props.required,
			onBlur: event => this.onBlur(event),
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

	componentWillMount() {
		this.updateItemsMap();
	}

	onBlur() {
		const { options } = this.props;
		if (options.restricted && !this.state.initalItems.includes(this.state.value)) {
			this.resetValue();
		} else if (options.restricted && this.state.initalItems.includes(this.state.value)) {
			this.props.onChange(this.state.value);
			this.resetSuggestions();
		} else {
			this.props.onChange(this.state.value);
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
		}
	}

	getLabel(value) {
		const { itemsMap } = this.state;

		if (itemsMap && Object.keys(itemsMap).length) {
			return Object.prototype.hasOwnProperty.call(itemsMap, value)
				? itemsMap[value]
				: value;
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
		this.setState({ value });
	}

	resetValue() {
		this.setValue('');
		this.resetSuggestions();
	}

	updateItemsMap() {
		const itemsMap = {};
		let items = [];

		if (this.props.schema.enum) {
			items = this.props.options.enumOptions;
		} else if (this.props.formContext.fetchItems) {
			items = this.props.formContext.fetchItems(this.props.schema.title);
		}

		(items || []).forEach((item) => {
			Object.assign(itemsMap, getValueLabelPair(item));
		});

		this.setState({ itemsMap });
	}

	initSuggestions(value) {
		let items = [];

		if (this.props.schema.enum) {
			items = this.props.schema.enum;
		} else if (this.props.formContext.fetchItems) {
			this.props.formContext.fetchItems(this.props.schema.title).forEach((t) => {
				items.push(getValueLabelPair(t).value);
			});
		}

		this.updateItemsMap();
		const suggestions = this.getMatchingSuggestions(items, value);
		this.setState({
			value,
			initalItems: items,
			items: suggestions,
			itemIndex: null,
			noMatch: value && items && !items.length,
		});
	}

	updateSuggestions(value) {
		let suggestions = this.getMatchingSuggestions(this.state.initalItems, value);
		if (!value && suggestions && suggestions.length === 0) {
			suggestions = this.state.initalItems;
		}

		this.setState({
			value,
			items: suggestions,
			itemIndex: null,
			noMatch: value && suggestions && !suggestions.length,
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
	options: {
		enumOptions: [],
	},
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
