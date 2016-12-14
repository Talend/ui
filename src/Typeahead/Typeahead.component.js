import React, { PropTypes } from 'react';
import uuid from 'uuid';
import classNames from 'classnames';
import Autowhatever from 'react-autowhatever';
import theme from './Typeahead.scss';
import { renderItem, renderInputComponent, renderSectionTitle } from './subRenderers';
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
			/>
		);
	}

	const containerClass = classNames(
		theme['tc-typeahead-container'],
		{
			[`${theme['right-container']}`]: position === 'right',
		}
	);

	const autowhateverProps = {
		...rest,
		inputProps: {
			value: rest.value,
			placeholder: rest.placeholder,
			onBlur: rest.onBlur,
			onChange: rest.onChange && (event => rest.onChange(event, { value: event.target.value })),
			debounceMinLength: rest.debounceMinLength,
			debounceTimeout: rest.debounceTimeout,
			icon,
		},
		itemProps: {
			onClick: rest.onSelect,
		},
		renderItem,
		renderInputComponent,
		multiSection: true,
		renderSectionTitle,
		getSectionItems: section => section.suggestions,
		theme: {
			container: containerClass,
			containerOpen: theme['container-open'],
			highlight: theme['highlight-match'],
			input: theme['typeahead-input'],
			itemFocused: theme['item-focused'],
			itemsContainer: theme['items-container'],
			itemsList: theme['items-list'],
			sectionContainer: theme['section-container'],
		},
		renderItemData: { value: rest.value },
	};

	return (
		<Autowhatever {...autowhateverProps} />
	);
}

Typeahead.defaultProps = {
	id: uuid.v4(),
	position: 'left',
	items: [],
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
	debounceMinLength: PropTypes.number,
	debounceTimeout: PropTypes.number,
};

export default Typeahead;
