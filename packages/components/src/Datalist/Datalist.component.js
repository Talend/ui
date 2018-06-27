import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';
import keycode from 'keycode';
import get from 'lodash/get';
import Typeahead from '../Typeahead';
import theme from './Datalist.scss';

export function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const PROPS_TO_OMIT = [
	'restricted',
	'titleMap',
];
const STATE_TO_OMIT = [
	'previousValue',
	'titleMapping',
];

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

		this.state = {
			previousValue: props.value,
			value: props.value,
			titleMapping: this.buildTitleMapping(props.titleMap),
		};
	}

	componentWillReceiveProps({ value, titleMap }) {
		this.setState({ previousValue: value, value, titleMapping: this.buildTitleMapping(titleMap) });
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
		if (this.props.onFocus) {
			this.props.onFocus();
		}
		event.target.select();
		this.updateSuggestions();
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
				if (!this.state.suggestions) {
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
				if (!this.state.suggestions) {
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
	 * @param sectionIndex The section index in suggestions list
	 * @param itemIndex The item index in suggestions list
	 */
	onSelect(event, { sectionIndex, itemIndex }) {
		let newValue = this.state.suggestions[itemIndex];
		if (this.props.multiSection) {
			newValue = this.state.suggestions[sectionIndex].suggestions[itemIndex];
		}
		this.updateValue(event, newValue, true);
	}

	/**
	 * Get the selected value's label.
	 * If there is no label defined or no label defined for the value, the value itself is returned.
	 */
	getSelectedLabel() {
		if (this.state.titleMapping) {
			return this.state.titleMapping[this.state.value] || this.state.value;
		}
		return this.state.value;
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
	 * Prepares a map (object) to match the label from the value in the render
	 * function.
	 *
	 * @param titleMap the titleMap to use to create the label/value mapping.
	 */
	buildTitleMapping(titleMap) {
		if (!titleMap) {
			return {};
		}
		return titleMap.reduce((obj, item) => {
			if (this.props.multiSection && item.title && item.suggestions) {
				const children = this.buildTitleMapping(item.suggestions);
				return { ...obj, ...children };
			}
			const mapping = { [item.value]: item.name || item.value };
			return { ...obj, ...mapping };
		}, {});
	}

	/**
	 * Update the focused item and section given the current value
	 * Managing the two cases (multi section and single section)
	 */
	updateSelectedIndexes(value) {
		if (this.props.multiSection) {
			const groups = this.props.titleMap;
			for (let sectionIndex = 0; sectionIndex < groups.length; sectionIndex += 1) {
				const focusedIndex = groups[sectionIndex].suggestions.findIndex(
					item => item.name === value,
				);
				if (focusedIndex > -1) {
					this.setState({
						focusedItemIndex: focusedIndex,
						focusedSectionIndex: sectionIndex,
					});
					break;
				}
			}
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
		const newValue = typeof value === 'object' ? value.title : value;
		this.setState({
			// setting the filtered value so it needs to be actual value
			value: newValue,
		});
		if (persist) {
			let enumValue = this.props.titleMap.find(item => item.name === value);
			if (this.props.multiSection) {
				const groups = this.props.titleMap;
				for (let sectionIndex = 0; sectionIndex < groups.length; sectionIndex += 1) {
					const itemObj = groups[sectionIndex].suggestions.find(item => item.name === newValue);
					if (itemObj) {
						enumValue = itemObj;
						break;
					}
				}
			}
			const selectedEnumValue = get(enumValue, 'value');
			if (selectedEnumValue || !this.props.restricted) {
				this.props.onChange(event, { value: selectedEnumValue || value });
				this.setState({
					previousValue: typeof previousValue === 'object' ? previousValue.title : previousValue,
				});
			} else {
				this.resetValue();
			}
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
						suggestions: value
							? group.suggestions.filter(item => regex.test(item.title))
							: group.suggestions,
					}))
					.filter(group => group.suggestions.length > 0);
			} else {
				// only one group so items are inline
				groups = value ? groups.filter(itemValue => regex.test(itemValue)) : groups;
			}
		}

		this.setState({ suggestions: groups });
	}

	/**
	 * Remove all suggestions
	 */
	resetSuggestions() {
		this.setState({
			suggestions: undefined,
		});
		this.resetSelection();
	}

	render() {
		const label = this.getSelectedLabel();
		return (
			<div className={theme['tc-datalist']}>
				<Typeahead
					{...omit(this.props, PROPS_TO_OMIT)}
					{...omit(this.state, STATE_TO_OMIT)}
					items={this.state.suggestions}
					onBlur={this.onBlur}
					onChange={this.onChange}
					onFocus={this.onFocus}
					onKeyDown={this.onKeyDown}
					onSelect={this.onSelect}
					theme={this.theme}
					value={label}
					caret
				/>
			</div>
		);
	}
}

Datalist.displayName = 'Datalist component';
Datalist.defaultProps = {
	value: '',
	restricted: false,
};

if (process.env.NODE_ENV !== 'production') {
	Datalist.propTypes = {
		onChange: PropTypes.func.isRequired,
		onFocus: PropTypes.func,
		disabled: PropTypes.bool,
		multiSection: PropTypes.bool.isRequired,
		readOnly: PropTypes.bool,
		restricted: PropTypes.bool,
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
		).isRequired,
		value: PropTypes.string,
	};
}

export default Datalist;
