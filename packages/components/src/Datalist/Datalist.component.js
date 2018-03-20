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
	 * Reset the focused item and section
	 */
	resetSelection() {
		this.setState({
			focusedItemIndex: undefined,
			focusedSectionIndex: undefined,
		});
	}

	/**
	 * Update value (non persistent) on input value change and update the suggestions
	 * @param event the change event
	 * @param value
	 */
	onChange(event, { value }) {
		this.updateSuggestions(value);
		this.updateValue(event, value, false);
		// resetting selection here in order to reinit the section + item indexes
		this.resetSelection();
	}

	/**
	 * Display suggestions on focus
	 * @param event the focus event
	 */
	onFocus(event) {
		event.target.select();
		this.updateSuggestions(this.state.value);
		this.updateSelectedIndexes(this.state.value);
	}

	/**
	 * Hook on input keydown
	 * ESC: reset the value to the previous persited one
	 * ENTER: select a suggestion, persist the value, or submit the form
	 * UP/DOWN: update the active suggestion index
	 * @param event The keydown event
	 * @param highlightedItemIndex The previous focused suggestion index
	 * @param newHighlightedItemIndex The new focused suggestion index
	 * @param highlightedSectionIndex The previous focused section index
	 * @param newHighlightedSectionIndex The new focused section index
	 */
	onKeyDown(event, params) {
		const {
			highlightedItemIndex,
			highlightedSectionIndex,
			newHighlightedItemIndex,
			newHighlightedSectionIndex,
		} = params;
		switch (event.which) {
			case keycode.codes.esc:
				event.preventDefault();
				this.resetValue();
				break;
			case keycode.codes.enter:
				if (!this.state.groups) {
					break;
				}
				event.preventDefault();
				if (Number.isInteger(highlightedItemIndex)) {
					// suggestions are displayed and an item has the focus : we select it
					this.onSelect(event, {
						itemIndex: highlightedItemIndex,
						sectionIndex: highlightedSectionIndex,
					});
				} else if (this.state.value !== this.state.previousValue) {
					// there is no focused item and the current value is not persisted
					// we persist it
					this.updateValue(event, this.state.value, true);
				}
				// resetting suggestions to close dropdown
				this.resetSuggestions();
				break;
			case keycode.codes.down:
				event.preventDefault();
				if (!this.state.groups) {
					// display all suggestions when they are not displayed
					this.updateSuggestions();
					this.updateSelectedIndexes(this.state.value);
					break;
				}
				this.setState({
					focusedItemIndex: newHighlightedItemIndex,
					focusedSectionIndex: newHighlightedSectionIndex,
				});
				break;
			case keycode.codes.up:
				event.preventDefault();
				this.setState({
					focusedItemIndex: newHighlightedItemIndex,
					focusedSectionIndex: newHighlightedSectionIndex,
				});
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
	onSelect(event, { sectionIndex, itemIndex }) {
		let newValue = this.state.groups[itemIndex];
		if (this.props.multiSection) {
			newValue = this.state.groups[sectionIndex].suggestions[itemIndex];
		}
		this.updateValue(event, newValue, true);
	}

	/**
	 * Update the focused item and section given the current value
	 * Managing the two cases (multi section and single section)
	 */
	updateSelectedIndexes(value) {
		if (this.props.multiSection) {
			this.props.titleMap.forEach((group, sectionIndex) => {
				const focusedIndex = group.suggestions.findIndex(item => item.name === value);
				if (focusedIndex > -1) {
					this.setState({
						focusedItemIndex: focusedIndex,
						focusedSectionIndex: sectionIndex,
					});
				}
			});
		} else {
			const index = this.props.titleMap.findIndex(item => item.name === value);
			this.setState({
				focusedItemIndex: index,
			});
		}
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

		this.setState({
			// setting the filtered value so it needs to be actual value
			value: typeof value === 'object' ? value.title : value,
			previousValue: typeof previousValue === 'object' ? previousValue.title : previousValue,
		});
		if (persist) {
			let enumValue = this.props.titleMap.find(item => item.name === value);
			if (this.props.multiSection) {
				this.props.titleMap.forEach(group => {
					const itemObj = group.suggestions.find(item => item.name === value.title);
					if (itemObj) {
						enumValue = itemObj;
					}
				});
			}
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
		this.resetSuggestions();
		this.setState({
			value: this.state.previousValue,
		});
	}

	/**
	 * Building multiSection items or single section items
	 * return the items list
	 */
	buildGroupItems() {
		if (this.props.multiSection) {
			return this.props.titleMap.map(group => ({
				title: group.title,
				suggestions: group.suggestions.map(item => ({ title: item.name })),
			}));
		}
		return this.props.titleMap.map(item => item.name);
	}

	/**
	 * Filter suggestions.
	 * This sets at least an empty array, which means the suggestion box will always display
	 * If the array is empty, the suggestion box will display a "No result" message
	 * Checking if the new value is equal to previous one,
	 * in that case we have to show all suggestions, otherwise we need to filter the suggestions
	 * @param value The value to base suggestions on
	 */
	updateSuggestions(value) {
		if (this.props.readOnly || this.props.disabled) {
			return;
		}

		// building multiSection items or single section items
		let groups = this.buildGroupItems();
		if (value) {
			// filtering
			const escapedValue = escapeRegexCharacters(value.trim());
			const regex = new RegExp(escapedValue, 'i');
			if (this.props.multiSection) {
				groups = groups
					.map(group => ({
						...group,
						suggestions: value != this.state.previousValue
							? group.suggestions.filter(item => regex.test(item.title))
							: group.suggestions,
					}))
					.filter(group => group.suggestions.length > 0);
			} else {
				// only one group so items are inline
				groups = value != this.state.previousValue ?
					groups.filter(itemValue => regex.test(itemValue)) : groups;
			}
		}

		this.setState({ groups });
	}

	/**
	 * Remove all suggestions
	 */
	resetSuggestions() {
		this.setState({
			groups: undefined,
		});
		this.resetSelection();
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
						focusedSectionIndex={this.state.focusedSectionIndex}
						items={this.state.groups}
						multiSection={this.props.multiSection}
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
		multiSection: PropTypes.bool.isRequired,
		placeholder: PropTypes.string,
		readOnly: PropTypes.bool,
		titleMap: PropTypes.arrayOf(
			PropTypes.oneOfType([
				PropTypes.shape({
					name: PropTypes.string.isRequired,
					value: PropTypes.string.isRequired,
				}),
				PropTypes.shape({
					title: PropTypes.string,
					items: PropTypes.arrayOf(
						PropTypes.shape({
							name: PropTypes.string,
							value: PropTypes.string,
						}),
					),
				}),
			]),
		),
		value: PropTypes.string,
	};
}

export default Datalist;
