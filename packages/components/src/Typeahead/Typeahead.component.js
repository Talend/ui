import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import uuid from 'uuid';
import classNames from 'classnames';
import Autowhatever from 'react-autowhatever';
import { useTranslation } from 'react-i18next';
import keycode from 'keycode';
import { usePopper } from 'react-popper';

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

	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);
	const [focus, setFocus] = useState(false);
	const withSameWidth = useMemo(
		() => ({
			name: 'withSameWidth',
			enabled: true,
			phase: 'beforeWrite',
			requires: ['computeStyles'],
			fn: ({ state }) => {
				// eslint-disable-next-line no-param-reassign
				state.styles.popper.width = `${state.rects.reference.width}px`;
			},
			effect: ({ state }) => {
				// eslint-disable-next-line no-param-reassign
				state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
			},
		}),
		[],
	);
	const withInViewport = useMemo(
		() => ({
			name: 'withInViewport',
			enabled: true,
			phase: 'beforeWrite',
			requires: ['computeStyles'],
			fn: ({ state }) => {
				const GAP = 45; // the offset between the end of items container and screen boundaries
				const inputDimensions = state.rects.reference;
				const { y, height } = inputDimensions;
				const offsetTop = y - GAP;
				const offsetBottom = window.innerHeight - y - height - GAP;
				const placements = state.placement.split('-');
				let newPlacement = state.placement;
				if (placements[0] === 'top' && offsetBottom > offsetTop) {
					newPlacement = `bottom-${placements[1]}`;
				}
				const maxHeight = newPlacement.includes('top') ? offsetTop : offsetBottom;

				// eslint-disable-next-line no-param-reassign
				state.placement = newPlacement;
				// eslint-disable-next-line no-param-reassign
				state.styles.popper.maxHeight = `${maxHeight}px`;
			},
		}),
		[],
	);

	const withInitialState = useMemo(
		() => ({
			name: 'withInitialState',
			enabled: true,
			phase: 'write',
			requires: ['computeStyles'],
			fn: ({ state }) => {
				if (!focus) {
					// eslint-disable-next-line no-param-reassign
					state.styles.popper.opacity = 0;
				} else {
					// eslint-disable-next-line no-param-reassign
					delete state.styles.popper.opacity;
				}
			},
		}),
		[focus],
	);

	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		modifiers: [
			{ name: 'hide', enabled: false },
			{ name: 'preventOverflow', enabled: false },
			{
				name: 'computeStyles',
				options: {
					adaptive: false,
				},
			},
			withSameWidth,
			withInViewport,
			withInitialState,
		],
		strategy: 'fixed',
		placement: 'bottom-start',
	});
	const [highlightedSectionIndex, setHighlightedSectionIndex] = useState(0);
	const [highlightedItemIndex, setHighlightedItemIndex] = useState(0);

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

	const handleKeyDown = (event, data) => {
		switch (event.which) {
			case keycode.codes.down:
			case keycode.codes.up:
				event.preventDefault();
				setHighlightedSectionIndex(data.newHighlightedSectionIndex);
				setHighlightedItemIndex(data.newHighlightedItemIndex);
				break;
			case keycode.codes.enter:
				event.preventDefault();
				if (highlightedItemIndex !== null && highlightedItemIndex !== null) {
					rest.onSelect(event, {
						sectionIndex: data.highlightedSectionIndex,
						itemIndex: data.highlightedItemIndex,
					});
				}
				break;
			case keycode.codes.esc:
				event.preventDefault();
				rest.onBlur(event);
				break;
			default:
		}
	};

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
			setReferenceElement,
			onBlur: rest.onBlur,
			onChange: rest.onChange && (event => rest.onChange(event, { value: event.target.value })),
			onFocus: event => {
				if (!focus) {
					setFocus(true);
				}
				if (rest.onFocus) {
					rest.onFocus(event);
				}
			},
			onClick: rest.onClick,
			onKeyDown: rest.onKeyDown || handleKeyDown,
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
			referenceElement,
			rest.children,

			setPopperElement,
			styles,
			attributes,
		),
		renderItemData: { value: rest.value, 'data-feature': rest['data-feature'] },
	};

	const autowhateverProps = {
		...defaultRenderersProps,
		...rest,
		...sectionProps,
		...themeProps,
		...inputProps,
		highlightedSectionIndex: rest.onKeyDown ? rest.focusedSectionIndex : highlightedSectionIndex,
		highlightedItemIndex: rest.onKeyDown ? rest.focusedItemIndex : highlightedItemIndex,
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
