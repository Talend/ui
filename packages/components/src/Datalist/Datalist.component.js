/* eslint-disable react/jsx-no-bind */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'lodash/omit';
import keycode from 'keycode';
import get from 'lodash/get';
import Typeahead from '../Typeahead';
import theme from './Datalist.module.scss';
import FocusManager from '../FocusManager';
import Icon from '../Icon';
import { useTranslation } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '../constants';

export function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const PROPS_TO_OMIT = ['restricted', 'titleMap', 'value'];
const DISPLAY = {
	ALL: 'all',
	FILTER: 'filter',
	NONE: 'none',
};

function isValuePresentInSuggestions(titleMap, filterValue, multiSection) {
	return !!multiSection
		? titleMap.find(group =>
				group.suggestions.find(item => filterValue.toLowerCase() === item.name.toLowerCase()),
		  )
		: titleMap.find(itemValue => filterValue.toLowerCase() === itemValue.name.toLowerCase());
}

function buildSuggestions({
	displayMode,
	titleMap,
	filterValue,
	multiSection,
	allowAddNewElements,
	allowAddNewElementsSuffix,
}) {
	if (displayMode === DISPLAY.NONE) {
		return undefined;
	}

	if (displayMode === DISPLAY.ALL && filterValue) {
		const result = [...titleMap];
		if (allowAddNewElements && !isValuePresentInSuggestions(titleMap, filterValue, multiSection)) {
			result.unshift({
				title: `${filterValue} ${allowAddNewElementsSuffix}`,
				name: filterValue,
				value: filterValue,
			});
		}
		return result;
	}

	if (displayMode === DISPLAY.ALL || !filterValue) {
		return titleMap;
	}

	// building multiSection items or single section items
	const escapedValue = escapeRegexCharacters(filterValue.trim());
	const regex = new RegExp(escapedValue, 'i');
	const result = multiSection
		? titleMap
				.map(group => ({
					...group,
					suggestions: filterValue
						? group.suggestions.filter(item => regex.test(item.name))
						: group.suggestions,
				}))
				.filter(group => group.suggestions.length > 0)
		: titleMap.filter(itemValue => regex.test(itemValue.name));

	if (allowAddNewElements && !isValuePresentInSuggestions(titleMap, filterValue, multiSection)) {
		result.unshift({
			title: `${filterValue} ${allowAddNewElementsSuffix}`,
			name: filterValue,
			value: filterValue,
		});
	}

	return result;
}

function findEntry(titleMap, attributeName, attributeValue = '') {
	if (!titleMap) {
		return null;
	}

	for (let index = 0; index < titleMap.length; index += 1) {
		const entry = titleMap[index];

		if (entry.suggestions) {
			// entry is a category, it has suggestions that are real entries {name, value}
			const categorySuggestion = entry.suggestions.find(
				item =>
					!item.disabled && item[attributeName].toLowerCase() === attributeValue.toLowerCase(),
			);
			if (categorySuggestion) {
				return categorySuggestion;
			}
		} else if (
			!entry.disabled &&
			String(entry[attributeName]).toLowerCase() === String(attributeValue).toLowerCase()
		) {
			// entry is {name, value}
			return entry;
		}
	}

	return null;
}

function getEntryFromName(titleMap, name, restricted) {
	if (name === '') {
		return { name, value: '' };
	}

	const entry = findEntry(titleMap, 'name', name);
	if (entry) {
		return entry;
	}

	return restricted ? undefined : { name, value: name };
}

function getEntryFromValue(titleMap, value, restricted) {
	const entry = findEntry(titleMap, 'value', value);
	if (entry) {
		return entry;
	}

	return restricted ? undefined : { name: value, value };
}

function getEntry(titleMap, nameOrValue, restricted) {
	const entry =
		findEntry(titleMap, 'name', nameOrValue) || findEntry(titleMap, 'value', nameOrValue);
	if (entry) {
		return entry;
	}

	return restricted ? undefined : { name: nameOrValue, value: nameOrValue };
}

function Datalist(props) {
	// Current persisted value
	// It's the object value key { name: "display value", value: "technical value" }
	const [{ name, value }, setEntry] = useState({});
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);

	// suggestions: filter value, display flag, current hover selection
	const [filterValue, setFilterValue] = useState('');
	const [displaySuggestion, setDisplaySuggestion] = useState(DISPLAY.NONE);
	const [selection, setSelection] = useState({
		focusedItemIndex: undefined,
		focusedSectionIndex: undefined,
	});

	// suggestions computation
	// we don't memo bacause it changes at EVERY modification
	const suggestions = buildSuggestions({
		displayMode: props.readOnly || props.disabled ? DISPLAY.NONE : displaySuggestion,
		titleMap: props.titleMap,
		filterValue,
		multiSection: props.multiSection,
		allowAddNewElements: props.allowAddNewElements,
		allowAddNewElementsSuffix:
			props.allowAddNewElementsSuffix ?? t('NEW_WITH_PARENTHESIS', '(new)'),
	});

	// in uncontrolled mode, props.value acts as an initial value, then Datalist handles state, props.value never changes.
	// in controlled mode, props.value has to be reflected every time it changes
	useEffect(() => {
		if (props.value === undefined || props.value === null) {
			return;
		}

		const entry = getEntryFromValue(props.titleMap, props.value);
		if (!entry) {
			return;
		}

		if (entry.value !== value || entry.name !== name) {
			setEntry(entry);
		}
		// Update the input value only if user did not change it
		if ((!name && !filterValue) || name === filterValue) {
			setFilterValue(entry.name);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.value, props.titleMap]);

	// Suggestion display syntaxic sugar
	const resetSelection = () =>
		setSelection({
			focusedItemIndex: undefined,
			focusedSectionIndex: undefined,
		});
	const showFilteredSuggestions = () => setDisplaySuggestion(DISPLAY.FILTER);
	const showAllSuggestions = () => setDisplaySuggestion(DISPLAY.ALL);
	const hideSuggestions = () => {
		setDisplaySuggestion(DISPLAY.NONE);
		resetSelection();
	};
	const resetFilter = () => {
		const entry = getEntryFromValue(props.titleMap, value);
		if (entry) {
			setFilterValue(entry.name);
		}
	};

	/**
	 * Set a value.
	 * This new value can be persisted, or not. If not, it enables the ESC key to reset the value
	 * @param event The change event
	 * @param newValue The new value
	 * @param persist Value will be persisted if true
	 */
	function updateValue(event, entry, persist) {
		// update the suggestion filter
		const newFilter = entry.name;
		setFilterValue(newFilter);

		if (persist) {
			setEntry(entry);
			props.onChange(event, { value: entry.value });
		} else if (props.onLiveChange) {
			props.onLiveChange(event, entry.value);
		}
	}

	/**
	 * Update the focused item and section given the current value
	 * Managing the two cases (multi section and single section)
	 */
	function setSelectionToCurrentValue() {
		if (props.multiSection) {
			const groups = props.titleMap;
			for (let sectionIndex = 0; sectionIndex < groups.length; sectionIndex += 1) {
				const focusedIndex = groups[sectionIndex].suggestions.findIndex(
					item => item.name === value,
				);
				if (focusedIndex > -1) {
					setSelection({
						focusedItemIndex: focusedIndex,
						focusedSectionIndex: sectionIndex,
					});
					break;
				}
			}
		} else {
			const index = props.titleMap.findIndex(item => item.name === value);
			setSelection({
				focusedItemIndex: index === -1 ? null : index,
			});
		}
	}

	/**
	 * Persist the current filter value as value
	 * @param {*} event
	 */
	function persistValue(event) {
		hideSuggestions();
		const selectedEntry = getEntryFromValue(props.titleMap, value, props.restricted);

		// If the filterValue is different from the selected entry
		if (!selectedEntry || selectedEntry.name !== filterValue) {
			const entry = getEntryFromName(props.titleMap, filterValue, props.restricted);

			if (entry && entry.value !== value) {
				updateValue(event, entry, true);
			} else {
				resetFilter();
			}
		}
	}

	/**
	 * On blur: persist the value and remove the suggestions
	 * @param event The blur event
	 */
	const onBlur = function onBlur(event) {
		if (props.onBlur) {
			props.onBlur();
		}
		persistValue(event);
	};

	/**
	 * Update value (non persistent) on input value change and update the suggestions
	 * @param event the change event
	 * @param payload
	 */
	function onFilterChange(event, payload) {
		const entry = getEntry(props.titleMap, payload.value);
		updateValue(event, entry, false);
		showFilteredSuggestions();

		// resetting selection here in order to reinit the section + item indexes
		resetSelection();
	}

	/**
	 * Display suggestions on focus
	 * @param event the focus event
	 */
	function onFocus(event) {
		if (props.onFocus) {
			props.onFocus(event);
		}
		event.target.select();
		showAllSuggestions();
		setSelectionToCurrentValue();
	}

	/**
	 * Display suggestions on click
	 * @param event the click event
	 */
	function onClick() {
		showAllSuggestions();
		setSelectionToCurrentValue();
	}

	/**
	 * Select an item in suggestions list
	 * @param event The select event
	 * @param sectionIndex The section index in suggestions list
	 * @param itemIndex The item index in suggestions list
	 */
	function onSelect(event, { sectionIndex, itemIndex }) {
		const newEntry = props.multiSection
			? suggestions[sectionIndex].suggestions[itemIndex]
			: suggestions[itemIndex];
		hideSuggestions();

		if (newEntry.disabled || newEntry.value === value) {
			event.preventDefault();
			return;
		}

		updateValue(event, newEntry, true);
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
	function onKeyDown(event, params) {
		const {
			highlightedItemIndex,
			highlightedSectionIndex,
			newHighlightedItemIndex,
			newHighlightedSectionIndex,
		} = params;
		switch (event.which) {
			case keycode.codes.esc:
				event.preventDefault();
				resetFilter();
				hideSuggestions();
				break;
			case keycode.codes.enter:
				if (!suggestions) {
					break;
				}
				event.preventDefault();
				if (Number.isInteger(highlightedItemIndex)) {
					// suggestions are displayed and an item has the focus : we select it
					onSelect(event, {
						itemIndex: highlightedItemIndex,
						sectionIndex: highlightedSectionIndex,
					});
				} else {
					// there is no focused item and the current value is not persisted, we persist it
					persistValue(event);
				}
				break;
			case keycode.codes.down:
			case keycode.codes.up:
				event.preventDefault();
				if (!suggestions) {
					// display all suggestions when they are not displayed
					showAllSuggestions();
					setSelectionToCurrentValue();
					break;
				}
				setSelection({
					focusedItemIndex: newHighlightedItemIndex,
					focusedSectionIndex: newHighlightedSectionIndex,
				});
				break;
			default:
				break;
		}
	}

	/**
	 * Returns the selected item's icon props if there's one or undefined.
	 * @returns {Object|undefined}
	 */
	function getSelectedIcon() {
		if (props.titleMap) {
			if (props.multiSection) {
				const multiSection = props.titleMap.find(titleMap =>
					titleMap.suggestions.find(suggestion => suggestion.name === value),
				);
				return get(
					multiSection && multiSection.suggestions.find(suggestion => suggestion.name === value),
					'icon',
				);
			}

			const item =
				props.titleMap.find(titleMap => titleMap.name === value) ||
				props.titleMap.find(titleMap => titleMap.value === value);
			if (item) {
				return get(item, 'icon');
			}
		}
		return undefined;
	}

	const icon = getSelectedIcon();
	return (
		<FocusManager onFocusOut={onBlur} className={theme['tc-datalist-item']} key="focus-manager">
			{icon && <Icon className={theme['tc-datalist-item-icon']} {...icon} />}
			<Typeahead
				{...omit(props, PROPS_TO_OMIT)}
				className={classNames('tc-datalist', props.className)}
				focusedItemIndex={selection.focusedItemIndex}
				focusedSectionIndex={selection.focusedSectionIndex}
				items={suggestions}
				onChange={onFilterChange}
				onFocus={onFocus}
				onClick={onClick}
				onKeyDown={onKeyDown}
				onSelect={onSelect}
				theme={{
					container: classNames(theme.container, 'tc-datalist-container'),
					itemsContainer: theme['items-container'],
					itemsList: theme.items,
				}}
				value={filterValue}
				valueId={value}
				caret
			/>
		</FocusManager>
	);
}

Datalist.displayName = 'Datalist component';
Datalist.defaultProps = {
	value: '',
	restricted: false,
	multiSection: false,
	titleMap: [],
};

Datalist.propTypes = {
	autoFocus: PropTypes.bool,
	allowAddNewElements: PropTypes.bool,
	allowAddNewElementsSuffix: PropTypes.string,
	isLoading: PropTypes.bool,
	className: PropTypes.string,
	onBlur: PropTypes.func,
	onChange: PropTypes.func.isRequired,
	onFocus: PropTypes.func,
	onClick: PropTypes.func,
	onLiveChange: PropTypes.func,
	disabled: PropTypes.bool,
	multiSection: PropTypes.bool,
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
				suggestions: PropTypes.arrayOf(
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

export default Datalist;
