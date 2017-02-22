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
export function getMatchingSuggestions(suggestions, value) {
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
function renderDatalistItemContainer(props) {
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

		for (let i = 0; i < restValues.length; i++) {
			emphasisedText.push(restValues[i]);
			if (matchedValues[i]) {
				emphasisedText.push(
					<em className={theme['highlight-match']}>{matchedValues[i]}</em>
				);
			}
		}
	}

	return (
		<div className={theme.item}>
			{emphasisedText.map((val, index) => <span key={index}>{val}</span>)}
		</div>
	);
}

/**
 * Render an empty container
 */
function renderNoMatch() {
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
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			items: [],
			itemIndex: null,
			noMatch: false,
		};

		this.inputProps = {
			required: props.required,
			onBlur: () => this.onBlur(),
			onFocus: () => this.initSuggestions(this.state.value),
			onChange: event => this.initSuggestions(event.target.value),
			onKeyDown: (event, payload) => this.onKeyDown(event, payload),
		};

		this.itemProps = {
			onMouseEnter: (event, { itemIndex }) => this.focusOnItem(itemIndex),
			onMouseLeave: () => this.focusOnItem(),
			onMouseDown: (event, { itemIndex }) => this.selectItem(itemIndex),
		};

		this.style = {
			container: classnames('form-control', theme['tf-typeahead-container']),
			containerOpen: theme['container-open'],
			highlight: theme['highlight-match'],
			input: theme['typeahead-input'],
			itemFocused: theme['item-focused'],
			itemsContainer: theme['items-container'],
			itemsList: theme.items,
		};
	}

	onBlur() {
		if (this.props.schema.enum.indexOf(this.state.value) === -1) {
			this.resetValue();
		} else {
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
			if (focusedItemIndex != null) { // could be null in case of no match
				this.selectItem(focusedItemIndex);
			}
			event.preventDefault();
			break;
		case keycode.codes.up:
		case keycode.codes.down:
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
		const suggestions = getMatchingSuggestions(this.props.schema.enum, value);
		this.setState({
			value,
			items: suggestions,
			itemIndex: null,
			noMatch: value && !suggestions.length,
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
		this.setValue(selectedItem);
		this.resetSuggestions();
		this.props.onChange(selectedItem);
	}

	render() {
		const renderItemData = { value: this.state.value };
		this.inputProps.value = this.state.value;
		return (
			<Autowhatever
				id={this.props.id}
				items={this.state.items}
				renderItem={renderDatalistItem}
				inputProps={this.inputProps}
				theme={this.style}
				renderItemData={renderItemData}
				renderInputComponent={renderDatalistInput}
				renderItemsContainer={this.state.noMatch ? renderNoMatch : renderDatalistItemContainer}
				focusedItemIndex={this.state.itemIndex}
				itemProps={this.itemProps}
			/>
		);
	}
}

if (process.env.NODE_ENV !== 'production') {
	DatalistWidget.propTypes = {
		id: PropTypes.string,
		required: PropTypes.bool,
		onChange: PropTypes.func.isRequired,
		schema: PropTypes.shape({
			enum: PropTypes.arrayOf(PropTypes.string),
		}).isRequired,
	};
}

export default DatalistWidget;
