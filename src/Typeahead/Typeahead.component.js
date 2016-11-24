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
		isOnlyIcon: PropTypes.boolean,
		icon: PropTypes.shape({
			name: PropTypes.string,
			title: PropTypes.string,
			actionStyle: PropTypes.string,
		}),
		onInputIconClick: PropTypes.func,
		isOnTheRight: PropTypes.boolean,
	}),
	focusedItemIndex: PropTypes.number,
	focusedSectionIndex: PropTypes.number,
	id: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
		suggestions: PropTypes.arrayOf(PropTypes.shape({
			title: PropTypes.string,
			description: PropTypes.string,
		})),
	})),
	inputProps: PropTypes.shape({
		value: PropTypes.string.isRequired,
		placeholder: PropTypes.string,
		onBlur: PropTypes.func,
		onKeyDown: PropTypes.func,
	}),
	itemProps: PropTypes.shape({
		onBlur: PropTypes.func,
		onKeyDown: PropTypes.func,
		onMouseEnter: PropTypes.func,
		onClick: PropTypes.func,
	}),
	renderItemData: PropTypes.shape({
		value: PropTypes.string,
	}),
};
export default Typeahead;
