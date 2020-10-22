import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import uuid from 'uuid';
import classNames from 'classnames';
import Autowhatever from 'react-autowhatever';
import { useTranslation } from 'react-i18next';

import theme from './Typeahead.scss';
import {
	renderItemsContainerFactory,
	renderInputComponent,
	renderSectionTitle,
	renderItem,
} from './Typeahead.component.renderers';
import { Action } from '../Actions';
import I18N_DOMAIN_COMPONENTS from '../constants';

function getItems(items, dataFeature) {
	if (!items) {
		return [];
	}
	if (!dataFeature) {
		return items;
	}

	return items.map(item => ({
		'data-feature': `${dataFeature}.${item.value}`,
		...item,
	}));
}

/**
 * Show suggestions for search bar
 * @example
 *
 * <Typeahead {...props} />
 */
function Typeahead({ onToggle, icon, position, docked, ...rest }) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);

	const inputRef = useRef(null);

	if (docked && onToggle) {
		return (
			<Action
				onClick={onToggle}
				label={icon.title}
				hideLabel
				icon={icon.name}
				bsStyle={icon.bsStyle}
				className={classNames(theme['only-icon-cls'], 'tc-typeahead-toggle')}
				role={icon.role}
				tooltipPlacement={icon.tooltipPlacement}
			/>
		);
	}

	const sectionProps = rest.multiSection
		? { getSectionItems: section => section.suggestions, renderSectionTitle }
		: null;

	const themeProps = {
		theme: {
			containerOpen: classNames(theme['container-open'], 'tc-typeahead-container-open'),
			highlight: classNames(theme['highlight-match'], 'tc-typeahead-highlight-match'),
			input: classNames(theme['typeahead-input'], 'tc-typeahead-typeahead-input'),
			itemHighlighted: classNames(theme['item-highlighted'], 'tc-typeahead-item-highlighted'),
			itemsContainer: classNames(theme['items-container'], 'tc-typeahead-items-container'),
			itemsList: theme.items,
			sectionContainer: classNames(theme['section-container'], 'tc-typeahead-section-container'),

			...rest.theme,
			container: classNames(
				theme['tc-typeahead-container'],
				'tc-typeahead-container',
				position === 'right' && theme.right,
				rest.theme && rest.theme.container,
				rest.className,
				{
					[theme.loading]: rest.isLoading,
				},
			),
		},
	};

	const inputProps = {
		renderInputComponent,
		inputProps: {
			autoFocus: rest.autoFocus,
			debounceMinLength: rest.debounceMinLength,
			debounceTimeout: rest.debounceTimeout,
			disabled: rest.disabled,
			id: rest.id,
			inputRef,
			onBlur: rest.onBlur,
			onChange: rest.onChange && (event => rest.onChange(event, { value: event.target.value })),
			onFocus: rest.onFocus,
			onClick: rest.onClick,
			onKeyDown: rest.onKeyDown,
			placeholder: rest.placeholder,
			readOnly: rest.readOnly,
			value: rest.value,
			icon,
			caret: rest.caret,
			role: rest.role,
			...rest.inputProps,
		},
	};

	const noResultText = rest.noResultText || t('NO_RESULT_FOUND', { defaultValue: 'No result.' });
	const searchingText =
		rest.searchingText || t('TYPEAHEAD_SEARCHING', { defaultValue: 'Searching for matches...' });
	const isLoadingText =
		rest.isLoadingText || t('TYPEAHEAD_LOADING', { defaultValue: 'Loading...' });
	const defaultRenderersProps = {
		renderItem,
		renderItemsContainer: renderItemsContainerFactory(
			rest.items,
			noResultText,
			rest.searching,
			searchingText,
			rest.isLoading,
			isLoadingText,
			inputRef,
			rest.children,
		),
		renderItemData: { value: rest.value, 'data-feature': rest['data-feature'] },
	};

	const compatibilityProps = {
		highlightedSectionIndex: rest.focusedSectionIndex,
		highlightedItemIndex: rest.focusedItemIndex,
	};

	const autowhateverProps = {
		...defaultRenderersProps,
		...rest,
		...compatibilityProps,
		...sectionProps,
		...themeProps,
		...inputProps,
		items: getItems(rest.items, rest.dataFeature),
		itemProps: ({ itemIndex }) => ({
			onMouseDown: event => event.preventDefault(),
			onClick: rest.onSelect,
			'aria-disabled': rest.items[itemIndex] && rest.items[itemIndex].disabled,
		}),
	};

	return <Autowhatever {...autowhateverProps} />;
}

Typeahead.displayName = 'Typeahead';

Typeahead.defaultProps = {
	autoFocus: false,
	disabled: false,
	id: uuid.v4().toString(),
	items: null,
	multiSection: true, // TODO this is for compat, see if we can do the reverse :(
	position: 'left',
	readOnly: false,
	searching: false,
	docked: false,
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
	docked: PropTypes.bool,
	icon: PropTypes.shape({
		tooltipPlacement: PropTypes.string,
		name: PropTypes.string,
		title: PropTypes.string,
		bsStyle: PropTypes.string,
		role: PropTypes.string,
	}),

	// input
	autoFocus: PropTypes.bool,
	debounceMinLength: PropTypes.number,
	debounceTimeout: PropTypes.number,
	disabled: PropTypes.bool,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onClick: PropTypes.func,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	value: PropTypes.string,

	// suggestions
	dataFeature: PropTypes.string,
	onSelect: PropTypes.func,
	onKeyDown: PropTypes.func,
	focusedSectionIndex: PropTypes.number,
	focusedItemIndex: PropTypes.number,
	multiSection: PropTypes.bool,
	items: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.string,
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
		]),
	),
	children: PropTypes.func, // render props
};

export default Typeahead;
