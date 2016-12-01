import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Autowhatever from 'react-autowhatever';
import theme from './Typeahead.scss';
import { renderItem, renderInputComponent, renderSectionTitle } from './subRenderers';
import { Action } from '../Actions';

/**
 * @example
 <Typeahead
 id={exampleId}
 items={items}
 inputProps={inputProps}
 itemProps={itemProps}
 config={config}
 focusedItemIndex={focusedItemIndex}
 focusedSectionIndex={focusedSectionIndex}
 renderItemData={renderItemData}
 />
 */

function Typeahead({ config, ...eprops }) {
	if (config && config.isOnlyIcon) {
		return (
			<Action
				onClick={config.onInputIconClick}
				label={config.icon.title}
				hideLabel
				icon={config.icon.name}
				bsStyle={config.icon.actionStyle}
				className={theme['only-icon-cls']}
			/>);
	}

	const aweProps = { ...eprops };
	aweProps.items = aweProps.items ? aweProps.items : [];
	const containerClass = classNames(
		theme['tc-typeahead-container'],
		{
			[`${theme['right-container']}`]: aweProps.items.length && config.isOnTheRight,
		}
	);

	aweProps.renderItem = renderItem;
	aweProps.renderInputComponent = renderInputComponent(config);
	aweProps.renderSectionTitle = renderSectionTitle;
	aweProps.getSectionItems = section => section.suggestions;
	aweProps.multiSection = true;
	aweProps.theme = {
		container: containerClass,
		containerOpen: theme['container-open'],
		highlight: theme['highlight-match'],
		input: theme['typeahead-input'],
		itemFocused: theme['item-focused'],
		itemsContainer: theme['items-container'],
		itemsList: theme['items-list'],
		sectionContainer: theme['section-container'],
	};
	return (<Autowhatever {...aweProps} />);
}
Typeahead.propTypes = {
	config: PropTypes.shape({
		// When set to true, the typeahead component renders only the button
		isOnlyIcon: PropTypes.boolean,
		// the icon of the button if isOnlyIcon === true, otherwise it's the icon of the input
		icon: PropTypes.shape({
			name: PropTypes.string, // name of the icon ex: fa fa-search
			title: PropTypes.string, // title of the icon ex: icon
			actionStyle: PropTypes.string, // the style of the button
		}),
		onInputIconClick: PropTypes.func, // the callback to trigger when isOnlyIcon === true
		isOnTheRight: PropTypes.boolean, // the position of the typeahead when RIGHT ===> LEFT
	}),
	// it's used in conjunction with focusedSectionIndex to specify the focused item
	focusedItemIndex: PropTypes.number,
	// it's used in conjunction with focusedItemIndex to specify the focused item
	focusedSectionIndex: PropTypes.number,
	id: PropTypes.string, // id of the component
	items: PropTypes.arrayOf(PropTypes.shape({ // List of categories in the list
		title: PropTypes.string, // title of the category
		description: PropTypes.string, // description of the category
		suggestions: PropTypes.arrayOf(PropTypes.shape({ // list of the suggestions per category
			title: PropTypes.string, // title of the item
			description: PropTypes.string, // description of the item
		})),
	})),
	inputProps: PropTypes.shape({
		value: PropTypes.string.isRequired, // value of the input
		placeholder: PropTypes.string, // placeholder of the input
		onBlur: PropTypes.func, // is used to hide the suggestions items
		onKeyDown: PropTypes.func,  // is used to update the value or to start focusing on the items
	}),
	itemProps: PropTypes.shape({
		onBlur: PropTypes.func, // is only used to update focusedItemIndex & focusedSectionIndex
		// is only used to update focusedItemIndex & focusedSectionIndex
		onMouseEnter: PropTypes.func,
		// is used to select the item or to change the focus by updating
		// (focusedItemIndex & focusedSectionIndex)
		onKeyDown: PropTypes.func,
		onClick: PropTypes.func, // is used to select the item
	}),
	renderItemData: PropTypes.shape({
		// Actually it's the same value as inputProps.value, it's used to highlight the matches
		// between the entered value and items
		value: PropTypes.string,
	}),
};
export default Typeahead;
