import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import keycode from 'keycode';
import get from 'lodash/get';

import Typeahead from '../Typeahead';
import theme from './Datalist.scss';

export function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

class Datalist extends Component {
	constructor(props) {
		super(props);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onSelect = this.onSelect.bind(this);

		this.theme = {
			container: classNames(theme.container, 'tc-datalist-container'),
			itemsContainer: theme['items-container'],
			itemsList: theme.items,
		};

		this.state = { previousValue: props.value, value: props.value };
	}

	componentWillReceiveProps({ value }) {
		this.setState({ previousValue: value, value });
	}

	/**
	 * Persist the value (if not already persisted) and remove the suggestions on blur event
	 * @param event The blur event
	 */
	onBlur(event) {
		this.resetSuggestions();
		const { value, previousValue } = this.state;

		if (value !== previousValue) {
			this.updateValue(event, value, true);
		}
	}

	/**
	 * Update value (non persistent) on input value change and update the suggestions
	 * @param event
	 * @param value
	 */
	onChange(event, { value }) {
		this.updateSuggestions(value);
		this.updateValue(event, value, false);
	}

	/**
	 * Display suggestions on focus
	 */
	onFocus() {
		this.updateSuggestions(this.state.value);
	}

	/**
	 * Hook on input keydown
	 * ESC: reset the value to the previous persited one
	 * ENTER: select a suggestion, persist the value, or submit the form
	 * UP/DOWN: update the active suggestion index
	 * @param event The keydown event
	 * @param highlightedItemIndex The previous focused suggestion index
	 * @param newHighlightedItemIndex The new focused suggestion index
	 */
	onKeyDown(event, { highlightedItemIndex, newHighlightedItemIndex }) {
		switch (event.which) {
			case keycode.codes.esc:
				event.preventDefault();
				this.resetValue();
				break;
			case keycode.codes.enter:
				if (!this.state.suggestions) {
					break;
				}
				event.preventDefault();
				if (Number.isInteger(highlightedItemIndex)) {
					// suggestions are displayed and an item has the focus : we select it
					this.onSelect(event, { itemIndex: highlightedItemIndex });
				} else if (this.state.value !== this.state.previousValue) {
					// there is no focused item and the current value is not persisted
					// we persist it
					this.updateValue(event, this.state.value, true);
				}
				this.resetSuggestions();
				break;
			case keycode.codes.down:
				event.preventDefault();
				if (!this.state.suggestions) {
					// display all suggestions when they are not displayed
					this.updateSuggestions();
				}
				this.setState({ focusedItemIndex: newHighlightedItemIndex });
				break;
			case keycode.codes.up:
				event.preventDefault();
				this.setState({ focusedItemIndex: newHighlightedItemIndex });
				break;
			default:
				break;
		}
	}

	/**
	 * Select an item in suggestions list
	 * @param event The select event
	 * @param itemIndex The item index in suggestions list
	 */
	onSelect(event, { itemIndex }) {
		const newValue = this.state.suggestions[itemIndex];
		this.updateValue(event, newValue, true);
	}

	/**
	 * Set a value.
	 * This new value can be persisted, or not. If not, it enables the ESC key to reset the value
	 * @param event The change event
	 * @param value The new value
	 * @param persist Value will be persisted if true
	 */
	updateValue(event, value, persist) {
		const previousValue = persist ? value : this.state.previousValue;
		this.setState({ value, previousValue });
		if (persist) {
			const enumValue = this.props.titleMap.find(item => item.name === value);
			const payload = { value: get(enumValue, 'value', value) };
			this.props.onChange(event, payload);
			this.props.onFinish(event, payload);
		}
	}

	/**
	 * Set back the value to the last validated value.
	 * This remove the suggestions.
	 */
	resetValue() {
		this.setState({
			suggestions: undefined,
			value: this.state.previousValue,
		});
	}

	/**
	 * Filter suggestions.
	 * This sets at least an empty array, which means the suggestion box will always display
	 * If the array is empty, the suggestion box will display a "No result" message
	 * @param value The value to base suggestions on
	 */
	updateSuggestions(value) {
		if (this.props.readOnly || this.props.disabled) {
			return;
		}

		let suggestions = this.props.titleMap.map(item => item.name);
		if (value) {
			const escapedValue = escapeRegexCharacters(value.trim());
			const regex = new RegExp(escapedValue, 'i');
			suggestions = suggestions.filter(itemValue => regex.test(itemValue));
		}

		this.setState({ suggestions });
	}

	/**
	 * Remove all suggestions
	 */
	resetSuggestions() {
		this.setState({
			suggestions: undefined,
			focusedItemIndex: undefined,
		});
	}

	render() {
		return (
			<div className={theme['tc-datalist']}>
				<form className={theme['tc-datalist-form']}>
					<Typeahead
						id={`${this.props.id}`}
						autoFocus={this.props.autoFocus || false}
						disabled={this.props.disabled || false}
						focusedItemIndex={this.state.focusedItemIndex}
						items={this.state.suggestions}
						multiSection={false}
						onBlur={this.onBlur}
						onChange={this.onChange}
						onFocus={this.onFocus}
						onKeyDown={this.onKeyDown}
						onSelect={this.onSelect}
						placeholder={this.props.placeholder}
						readOnly={this.props.readOnly || false}
						theme={this.theme}
						value={this.state.value}
					/>
				</form>
				<div className={theme.toggle}>
					<span className="caret" />
				</div>
			</div>
		);
	}
}

Datalist.displayName = 'Datalist component';
Datalist.defaultProps = {
	value: '',
};

if (process.env.NODE_ENV !== 'production') {
	Datalist.propTypes = {
		autoFocus: PropTypes.bool,
		id: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onFinish: PropTypes.func.isRequired,
		disabled: PropTypes.bool,
		placeholder: PropTypes.string,
		readOnly: PropTypes.bool,
		restricted: PropTypes.bool,
		titleMap: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				value: PropTypes.string.isRequired,
			}),
		),
		value: PropTypes.string,
	};
}

export default Datalist;
