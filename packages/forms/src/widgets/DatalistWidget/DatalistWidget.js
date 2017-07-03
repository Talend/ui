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
 * Filter suggestions
 * @param suggestions
 * @param value
 */
export function getMatchingSuggestions(suggestions = [], value) {
	if (!value) {
		return suggestions;
	}

	const escapedValue = escapeRegexCharacters(value.trim());
	const regex = new RegExp(escapedValue, 'i');
	return suggestions.filter(item => regex.test(item));
}

/**
 * Render the datalist input
 * @param props
 */
function renderDatalistInput(props) {
	return (
		<div className={theme['typeahead-input-icon']}>
			<FormControl {...props} />
			<div className={theme['dropdown-toggle']}>
				<span className="caret" />
			</div>
		</div>);
}

/**
 * Render the datalist suggestion items container
 * @param props
 */
function defaultRenderDatalistItemContainer(props) {
	return (<div {...props} />);
}

/**
 * Render the datalist suggestion item
 * @param item
 * @param value
 */
function renderDatalistItem(item, { value }) {
	let emphasisedText = [item];
	if (value) {
		emphasisedText = [];
		const regex = new RegExp(escapeRegexCharacters(value), 'gi');
		const matchedValues = item.match(regex);
		const restValues = item.split(regex);

		for (let i = 0; i < restValues.length; i += 1) {
			emphasisedText.push(restValues[i]);
			if (matchedValues[i]) {
				emphasisedText.push(<em className={theme['highlight-match']}>{matchedValues[i]}</em>);
			}
		}
	}

	return (
		<div className={classnames(theme.item, 'datalist-item')}>
			{emphasisedText.map((val, index) => <span key={index}>{val}</span>)}
		</div>
	);
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
 * Render a typeahead for filtering among a list
 * @param props
 */
class DatalistWidget extends React.Component {

	static propTypes = {
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
			// Is the field value restricted to the suggestion list
			restricted: PropTypes.bool,
		}),
		renderItemsContainer: PropTypes.func,
		renderNoMatch: PropTypes.func,
		placeholder: PropTypes.string,
	};

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

	onBlur(event) {
		const { options } = this.props;
		if (options.restricted &&
			!this.state.initalItems.includes(this.state.value)) {
			this.resetValue();
		} else if (options.restricted &&
			this.state.initalItems.includes(this.state.value)) {
			this.props.onChange(this.state.value);
			this.resetSuggestions();
		} else {
			const { value } = event.target;
			if (value !== this.state.value) {
				this.props.onChange(value);
			}
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

	setValue(value) {
		this.setState({ value });
	}

	resetValue() {
		this.setValue('');
		this.resetSuggestions();
	}

	initSuggestions(value) {
		let items;
		if (this.props.schema.enum) {
			items = this.props.schema.enum;
		} else if (this.props.formContext.fetchItems) {
			items = this.props.formContext.fetchItems(this.props.schema.title);
		}
		const suggestions = getMatchingSuggestions(items, value);
		this.setState({
			value,
			initalItems: items,
			items: suggestions,
			itemIndex: null,
			noMatch: value && items && !items.length,
		});
	}

	updateSuggestions(value) {
		let suggestions = getMatchingSuggestions(this.state.initalItems, value);
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
		if ((selectedItem && selectedItem !== this.state.value) || (this.props.options.restricted)) {
			this.setValue(selectedItem);
			this.resetSuggestions();
			this.props.onChange(selectedItem);
		}
	}

	render() {
		const renderItemData = { value: this.state.value };
		this.inputProps.value = this.state.value;
		const renderItemsContainer =
			this.props.renderItemsContainer || defaultRenderDatalistItemContainer;
		const renderNoMatch = this.props.renderNoMatch || defaultRenderNoMatch;
		return (
			<Autowhatever
				id={this.props.id}
				items={this.state.items}
				renderItem={renderDatalistItem}
				inputProps={this.inputProps}
				theme={this.style}
				renderItemData={renderItemData}
				renderInputComponent={renderDatalistInput}
				renderItemsContainer={this.state.noMatch ? renderNoMatch : renderItemsContainer}
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

export default DatalistWidget;
