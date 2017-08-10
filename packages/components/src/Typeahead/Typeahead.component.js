import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid';
import classNames from 'classnames';
import Autowhatever from 'react-autowhatever';

import theme from './Typeahead.scss';
import {
	renderItemsContainerFactory,
	renderInputComponent,
	renderSectionTitle,
	renderItem,
} from './Typeahead.component.renderers';
import { Action } from '../Actions';

/**
 * Show suggestions for search bar
 * @example
 *
 * <Typeahead {...props} />
 */
function Typeahead({ onToggle, icon, position, ...rest }) {
	if (onToggle) {
		return (
			<Action
				onClick={onToggle}
				label={icon.title}
				hideLabel
				icon={icon.name}
				bsStyle={icon.bsStyle}
				className={theme['only-icon-cls']}
				tooltipPlacement={icon.tooltipPlacement}
			/>
		);
	}

	const containerClass = classNames(
		theme['tc-typeahead-container'],
		(position === 'right') && theme.right,
	);

	const autowhateverProps = {
		...rest,
		inputProps: {
			value: rest.value,
			placeholder: rest.placeholder,
			onBlur: rest.onBlur,
			onChange: rest.onChange && (event => rest.onChange(event, { value: event.target.value })),
			onKeyDown: rest.onKeyDown,
			debounceMinLength: rest.debounceMinLength,
			debounceTimeout: rest.debounceTimeout,
			icon,
		},
		itemProps: {
			onMouseDown: rest.onSelect,
		},
		renderInputComponent,
		renderItemsContainer: renderItemsContainerFactory(
			rest.items, rest.noResultText, rest.searching, rest.searchingText),
		renderSectionTitle,
		renderItem,
		multiSection: true,
		getSectionItems: section => section.suggestions,
		theme: {
			...rest.theme,
			container: containerClass,
			containerOpen: theme['container-open'],
			highlight: theme['highlight-match'],
			input: theme['typeahead-input'],
			itemFocused: theme['item-focused'],
			itemsContainer: theme['items-container'],
			itemsList: theme.items,
			sectionContainer: theme['section-container'],
		},
		focusedSectionIndex: rest.focusedSectionIndex,
		focusedItemIndex: rest.focusedItemIndex,
		items: rest.items || [],
		renderItemData: { value: rest.value },
	};

	return (
		<Autowhatever {...autowhateverProps} />
	);
}

Typeahead.defaultProps = {
	id: uuid.v4(),
	position: 'left',
	items: null,
	noResultText: 'No result.',
	searching: false,
	searchingText: 'Searching for matches…',
};

Typeahead.propTypes = {
	id: PropTypes.string,
	onToggle: PropTypes.func,
	icon: PropTypes.shape({
		name: PropTypes.string,
		title: PropTypes.string,
		bsStyle: PropTypes.string,
	}),
	position: PropTypes.oneOf(['left', 'right']),
	value: PropTypes.string,
	placeholder: PropTypes.string,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	onSelect: PropTypes.func,
	onKeyDown: PropTypes.func,
	focusedSectionIndex: PropTypes.number,
	focusedItemIndex: PropTypes.number,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string,
			description: PropTypes.string,
			suggestions: PropTypes.arrayOf(
				PropTypes.shape({
					title: PropTypes.string,
					description: PropTypes.string,
				}),
			),
		}),
	),
	noResultText: PropTypes.string,
	searching: PropTypes.bool,
	searchingText: PropTypes.string,
	debounceMinLength: PropTypes.number,
	debounceTimeout: PropTypes.number,
};

export default Typeahead;
