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

	const sectionProps = rest.multiSection ?
		{ getSectionItems: section => section.suggestions, renderSectionTitle } :
		null;

	const themeProps = {
		theme: {
			containerOpen: theme['container-open'],
			highlight: theme['highlight-match'],
			input: theme['typeahead-input'],
			itemFocused: theme['item-focused'],
			itemsContainer: theme['items-container'],
			itemsList: theme.items,
			sectionContainer: theme['section-container'],

			...rest.theme,
			container: classNames(
				theme['tc-typeahead-container'],
				(position === 'right') && theme.right,
				rest.theme && rest.theme.container,
				rest.className,
			),
		},
	};

	const inputProps = {
		renderInputComponent,
		inputProps: {
			autoFocus: rest.autoFocus,
			debounceMinLength: rest.debounceMinLength,
			debounceTimeout: rest.debounceTimeout,
			onBlur: rest.onBlur,
			onChange: rest.onChange && (event => rest.onChange(event, { value: event.target.value })),
			onFocus: rest.onFocus,
			onKeyDown: rest.onKeyDown,
			placeholder: rest.placeholder,
			value: rest.value,
			icon,
		},
	};

	const defaultRenderersProps = {
		renderItem,
		renderItemsContainer: renderItemsContainerFactory(
			rest.items,
			rest.noResultText,
			rest.searching,
			rest.searchingText
		),
		renderItemData: { value: rest.value },
	};

	const autowhateverProps = {
		...defaultRenderersProps,
		...rest,
		...sectionProps,
		...themeProps,
		...inputProps,
		items: rest.items || [],
		itemProps: {
			onMouseDown: rest.onSelect,
		},
	};

	return (
		<Autowhatever {...autowhateverProps} />
	);
}

Typeahead.defaultProps = {
	id: uuid.v4(),
	position: 'left',
	items: null,
	multiSection: true, // TODO this is for compat, see if we can do the reverse :(
	noResultText: 'No result.',
	searching: false,
	searchingText: 'Searching for matches…',
};

Typeahead.propTypes = {
	// container
	id: PropTypes.string,
	className: PropTypes.string,
	noResultText: PropTypes.string,
	position: PropTypes.oneOf(['left', 'right']),
	searching: PropTypes.bool,
	searchingText: PropTypes.string,

	// toggle button
	onToggle: PropTypes.func,
	icon: PropTypes.shape({
		name: PropTypes.string,
		title: PropTypes.string,
		bsStyle: PropTypes.string,
	}),

	// input
	autoFocus: PropTypes.bool,
	debounceMinLength: PropTypes.number,
	debounceTimeout: PropTypes.number,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	placeholder: PropTypes.string,
	value: PropTypes.string,

	// suggestions
	onSelect: PropTypes.func,
	onKeyDown: PropTypes.func,
	focusedSectionIndex: PropTypes.number,
	focusedItemIndex: PropTypes.number,
	multiSection: PropTypes.bool,
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
};

export default Typeahead;
